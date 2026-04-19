# --- DynamoDB ---

resource "aws_dynamodb_table" "visitor_count" {
  name         = "visitor-count"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# --- Lambda ---

data "archive_file" "visitor_counter" {
  type        = "zip"
  source_file = "${path.module}/../lambda/visitor_counter.py"
  output_path = "${path.module}/../lambda/visitor_counter.zip"
}

resource "aws_lambda_function" "visitor_counter" {
  function_name    = "visitor-counter"
  runtime          = "python3.12"
  handler          = "visitor_counter.handler"
  role             = aws_iam_role.lambda.arn
  filename         = data.archive_file.visitor_counter.output_path
  source_code_hash = data.archive_file.visitor_counter.output_base64sha256

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.visitor_count.name
    }
  }
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visitor_counter.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.visitor.execution_arn}/*/*"
}

# --- API Gateway (HTTP API) ---

resource "aws_apigatewayv2_api" "visitor" {
  name          = "visitor-counter-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://${var.domain_name}", "https://www.${var.domain_name}"]
    allow_methods = ["GET", "POST"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "visitor" {
  api_id                 = aws_apigatewayv2_api.visitor.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.visitor_counter.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "visitor_post" {
  api_id    = aws_apigatewayv2_api.visitor.id
  route_key = "POST /visitor"
  target    = "integrations/${aws_apigatewayv2_integration.visitor.id}"
}

resource "aws_apigatewayv2_route" "visitor_get" {
  api_id    = aws_apigatewayv2_api.visitor.id
  route_key = "GET /visitor"
  target    = "integrations/${aws_apigatewayv2_integration.visitor.id}"
}

resource "aws_apigatewayv2_stage" "visitor" {
  api_id      = aws_apigatewayv2_api.visitor.id
  name        = "$default"
  auto_deploy = true
}

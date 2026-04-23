output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "site_url" {
  description = "Custom domain URL"
  value       = "https://${var.domain_name}"
}

output "api_endpoint" {
  description = "Visitor counter API endpoint"
  value       = "${aws_apigatewayv2_stage.visitor.invoke_url}/visitor"
}

output "acm_validation_records" {
  description = "DNS records to add in Gandi to validate the ACM certificate (first-time cert issuance only)"
  value       = { for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => { name = dvo.resource_record_name, type = dvo.resource_record_type, value = dvo.resource_record_value } }
}

output "cloudfront_domain_for_dns" {
  description = "Point a Gandi CNAME (or ALIAS) for sanniajean.com and www to this value"
  value       = aws_cloudfront_distribution.site.domain_name
}

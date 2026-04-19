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

output "route53_nameservers" {
  description = "Paste these into Gandi's nameserver settings to delegate DNS to Route 53"
  value       = aws_route53_zone.zone.name_servers
}

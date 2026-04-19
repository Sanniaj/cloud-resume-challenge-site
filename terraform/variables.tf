variable "aws_region" {
  description = "Primary AWS region"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Custom domain name (e.g. sanniajean.com)"
  type        = string
}

variable "s3_bucket_name" {
  description = "S3 bucket name for website files (must be globally unique)"
  type        = string
}

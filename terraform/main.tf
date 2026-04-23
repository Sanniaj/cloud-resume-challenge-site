terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }

  # TODO: replace the placeholder bucket name before running `terraform init`
  # on a new machine. Needs: an S3 bucket for state + a DynamoDB table named
  # `terraform-state-lock` with partition key `LockID` (String) for state locking.
  backend "s3" {
    bucket         = "YOUR_TERRAFORM_STATE_BUCKET"
    key            = "cloud-resume/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

# CloudFront ACM certificates must be in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

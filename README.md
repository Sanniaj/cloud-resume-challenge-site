# cloud-resume-challenge-site

My take on the [Cloud Resume Challenge](https://cloudresumechallenge.dev/), a site served from S3 + CloudFront, with a visitor counter backed by API Gateway,
Lambda, and DynamoDB. All infrastructure is managed by Terraform.

Live at [sanniajean.com](https://sanniajean.com).

## Architecture

```
 Browser ──▶ CloudFront ──▶ S3 (static site)
     │
     └─────▶ API Gateway (HTTP) ──▶ Lambda ──▶ DynamoDB
```

- **Frontend**: plain HTML/CSS/JS, split by page under `src/` (home, about, projects, contact)
- **Backend**: Python 3.12 Lambda in `lambda/visitor_counter.py` — GET reads the count,
  POST increments it atomically via a DynamoDB `ADD` expression
- **Infra**: Terraform in `terraform/` — S3, CloudFront (with OAC), ACM, DynamoDB,
  Lambda, API Gateway v2, IAM
- **DNS**: registered at Gandi; the ACM validation records and the apex/www records
  are managed manually there (Route 53 isn't used)

## Layout

```
src/            static site, one folder per page
lambda/         visitor counter function source
terraform/      all AWS infrastructure
```

## Deploying

Prereqs: Terraform ≥ 1.5, AWS credentials with permission to manage the resources
above, and an S3 bucket + DynamoDB table for remote state (see the `backend` block
in `terraform/main.tf`).

```bash
cd terraform
terraform init
terraform apply \
  -var "domain_name=example.com" \
  -var "s3_bucket_name=your-unique-bucket-name"
```

First-time only: after `apply`, grab the `acm_validation_records` output and add the
CNAMEs in Gandi to validate the certificate. Then point `example.com` and `www` at
the `cloudfront_domain_for_dns` output.

Site files are synced to S3 manually:

```bash
aws s3 sync src/ s3://your-unique-bucket-name/ --delete
```

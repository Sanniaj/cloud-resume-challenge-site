# Cloud Resume Challenge

A serverless resume website built as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/). This project demonstrates cloud architecture skills using AWS services and infrastructure as code.

🔗 **Live Site:** [sanniajean.com](https://www.sanniajean.com)

## Architecture

This project uses a fully serverless architecture on AWS:

- **Frontend**: HTML, CSS, JavaScript hosted on Amazon S3
- **CDN**: CloudFront distribution for HTTPS and global content delivery
- **API**: API Gateway for RESTful API endpoints
- **Backend**: AWS Lambda functions (Python) for business logic
- **Database**: DynamoDB for storing visitor counter data
- **Infrastructure**: Terraform for Infrastructure as Code (IaC)

## Features

- Responsive resume website
- Real-time visitor counter
- HTTPS enabled via CloudFront
- Custom domain name
- Serverless backend with Lambda
- Infrastructure provisioned with Terraform
- CI/CD pipeline (coming soon)

## Architecture Diagram

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  CloudFront     │ (HTTPS, CDN)
└────────┬────────┘
         │
         ▼
    ┌────────┐
    │   S3   │ (Static Website)
    └────────┘
         │
         │ (API Call)
         ▼
┌─────────────────┐
│  API Gateway    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Lambda         │ (Python)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  DynamoDB       │ (Visitor Count)
└─────────────────┘
```

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Backend:**
- Python 3.x
- AWS Lambda
- API Gateway
- DynamoDB

**Infrastructure:**
- Terraform
- AWS S3
- AWS CloudFront

## Project Structure
```
cloud-resume-challenge-site/
├── lambda/
│   └── visitor_counter.py     # Lambda function for visitor count
├── Website Code/
│   ├── about/
│   │   ├── about.css
│   │   ├── about.js
│   │   └── aboutMe.html
│   ├── contact/
│   │   ├── contact.css
│   │   ├── contact.html
│   │   └── contact.js
│   ├── global/
│   │   ├── fonts/
│   │   │   ├── lemon_milk/
│   │   │   │   ├── LEMONMILK-Medium.otf
│   │   │   │   └── LEMONMILK-Regular.otf
│   │   │   └── Roboto/
│   │   │       └── Roboto-Light.ttf
│   │   ├── global.css
│   │   └── global.js
│   ├── home/
│   │   ├── DSC01176-edited.jpg
│   │   ├── home.css
│   │   └── home.js
│   └── projects/
│       └── home.html
└── README.md
```

## Setup & Deployment

### Prerequisites
- AWS Account
- AWS CLI configured
- Terraform installed
- Python 3.x

### Deployment Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sanniaj/cloud-resume-challenge-site.git
   cd cloud-resume-challenge-site
   ```

2. **Deploy infrastructure with Terraform**
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

3. **Upload website files to S3**
   ```bash
   aws s3 sync . s3://your-bucket-name --exclude "terraform/*" --exclude ".git/*"
   ```

4. **Deploy Lambda function**
   ```bash
   cd lambda
   zip function.zip visitor_counter.py
   aws lambda update-function-code --function-name visitor-counter --zip-file fileb://function.zip
   ```


## Challenges & Learning

### CORS Configuration
Initially struggled with CORS errors when the frontend tried to call the API. Learned to properly configure CORS headers in both API Gateway and Lambda responses.

### DynamoDB Atomic Updates
Implemented atomic counters in DynamoDB to prevent race conditions when multiple users visit simultaneously.

### CloudFront Cache Invalidation
Had to learn how to properly invalidate CloudFront cache after updating website files to see changes immediately.

### Terraform State Management
Learned the importance of proper state management and implemented S3 backend for Terraform state (coming soon).

## Cost Optimization

This project is designed to run within AWS Free Tier:
- S3: First 5GB storage free
- CloudFront: 1TB data transfer out free for 12 months
- Lambda: 1M requests free per month
- DynamoDB: 25GB storage + 25 RCU/WCU free
- API Gateway: 1M API calls free for 12 months

**Estimated monthly cost after free tier:** < $1

## Resources

- [Cloud Resume Challenge](https://cloudresumechallenge.dev/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Lambda Python](https://docs.aws.amazon.com/lambda/latest/dg/lambda-python.html)

## License

MIT License - feel free to use this project as inspiration for your own Cloud Resume Challenge!

## Contact

Sannia Jean
- Website: [www.sanniajean.com](https://www.sanniajean.com)
- GitHub: [@Sanniaj](https://github.com/Sanniaj)

---

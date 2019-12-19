variable "create_s3" {
  default = 0
  description = "Create S3 bucket"
}

resource "aws_s3_bucket" "bucket_storage" {
  count = var.create_s3
  bucket = "${var.project}-site-storage"
  acl    = "private"

  tags = {
    team = var.team
    project = var.project
  }
  versioning {
    enabled = true
  }

  website {
    index_document = "index.html"
  }
}


resource "aws_s3_bucket_policy" "static_policy" {
  count  = var.create_s3
  bucket = aws_s3_bucket.bucket_storage[0].id
  policy = data.aws_iam_policy_document.s3_policy[0].json
}

data "aws_iam_policy_document" "s3_policy" {
  count = var.create_s3

  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
    ]

    principals {
      identifiers = [aws_cloudfront_origin_access_identity.access_identity[0].iam_arn]
      type = "AWS"
    }

    resources = [
      "${aws_s3_bucket.bucket_storage[0].arn}/*",
    ]
  }
}

resource "aws_cloudfront_origin_access_identity" "access_identity" {
  count   = var.create_s3
  comment = "${var.project}-cloudfront"
}

resource "aws_cloudfront_distribution" "cloudfront" {
  enabled = true

  default_cache_behavior {
    target_origin_id = "S3"

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]

    compress        = true

    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  origin {
    domain_name = aws_s3_bucket.bucket_storage[0].bucket_regional_domain_name
    origin_id   = "S3"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.access_identity[0].cloudfront_access_identity_path
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  wait_for_deployment = false

  tags = {
    team = var.team
    project = var.project
  }
}
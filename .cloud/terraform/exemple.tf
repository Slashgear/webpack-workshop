variable "create_s3" {
  default = 0
  description = "Create S3 bucket"
}

variable "create_codebuild" {
  default = 0
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
  count = var.create_s3
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

resource "aws_iam_role" "bedrock_styleguide_codebuild_role" {
  count = var.create_s3

  name                  = "${var.project}-codebuild"
  path                  = "/service-role/codebuild/"
  force_detach_policies = true

  max_session_duration = 28800
  assume_role_policy   = data.aws_iam_policy_document.bedrock_styleguide_codebuild_assume_role[0].json
}

data "aws_iam_policy_document" "bedrock_styleguide_codebuild_assume_role" {
  count = var.create_s3

  statement {
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = [data.terraform_remote_state.iam.outputs.codebuild_cicd_iam_role_arn]
    }

    actions = [
      "sts:AssumeRole",
    ]
  }
}

data "aws_iam_account_alias" "current" {
}

resource "aws_iam_role_policy_attachment" "push_to_s3_role-attach" {
  count      = var.create_s3
  role       = aws_iam_role.bedrock_styleguide_codebuild_role[0].name
  policy_arn = aws_iam_policy.push_to_s3[0].arn
}

resource "aws_iam_policy" "push_to_s3" {
  count  = var.create_s3
  policy = data.aws_iam_policy_document.push_to_s3[0].json
}

data "aws_iam_policy_document" "push_to_s3" {
  count = var.create_s3

  statement {
    effect = "Allow"

    actions = [
      "s3:*",
    ]

    resources = [
      "${aws_s3_bucket.bucket_storage[0].arn}/*",
    ]
  }
}


resource "aws_codebuild_project" "codebuild" {
  count         = var.create_codebuild

  name = "${var.project}-deployer"
  service_role  = data.terraform_remote_state.iam.outputs.codebuild_cicd_iam_role_arn


  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type = "BUILD_GENERAL1_MEDIUM"
    image                       = "aws/codebuild/standard:2.0"
    image_pull_credentials_type = "CODEBUILD"
    type            = "LINUX_CONTAINER"
  }
  source {
    type            = "GITHUB_ENTERPRISE"
    location        = "https://github.m6web.fr/a-caron/webpack-workshop"
    git_clone_depth = 1

    buildspec = ".cloud/jenkins/buildspec/styleguide/buildspec.yml"
  }

  tags = {
    team = var.team
    project = var.project
  }
}

data "terraform_remote_state" "iam" {
  backend = "s3"

  config = {
    bucket     = "6cloud-tfstates"
    key        = "services/github.m6web.fr/sysadmin/terraform/30_applications/codebuild-cicd.tfstate"
    encrypt    = true
    kms_key_id = "arn:aws:kms:eu-west-3:908538848727:key/ae408c08-77b9-4670-8b68-7d7941208ff8"
    region     = "eu-west-3"
    profile    = "6cloud-services"
  }
}

data "terraform_remote_state" "network" {
  backend = "s3"

  config = {
    bucket     = "6cloud-tfstates"
    key        = "${terraform.workspace}/github.m6web.fr/sysadmin/terraform/00_network.tfstate"
    encrypt    = true
    kms_key_id = "arn:aws:kms:eu-west-3:908538848727:key/ae408c08-77b9-4670-8b68-7d7941208ff8"
    region     = "eu-west-3"
    profile    = "6cloud-services"
  }
}

data "terraform_remote_state" "security_group" {
  backend = "s3"

  config = {
    bucket     = "6cloud-tfstates"
    key        = "${terraform.workspace}/github.m6web.fr/sysadmin/terraform/10_security/security_group.tfstate"
    encrypt    = true
    kms_key_id = "arn:aws:kms:eu-west-3:908538848727:key/ae408c08-77b9-4670-8b68-7d7941208ff8"
    region     = "eu-west-3"
    profile    = "6cloud-services"
  }
}

data "terraform_remote_state" "s3" {
  backend = "s3"

  config = {
    bucket     = "6cloud-tfstates"
    key        = "services/github.m6web.fr/sysadmin/terraform/30_applications/codebuild-cicd.tfstate"
    encrypt    = true
    kms_key_id = "arn:aws:kms:eu-west-3:908538848727:key/ae408c08-77b9-4670-8b68-7d7941208ff8"
    region     = "eu-west-3"
    profile    = "6cloud-services"
  }
}

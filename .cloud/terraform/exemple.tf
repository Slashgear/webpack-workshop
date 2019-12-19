variable "create_s3" {
  default = 0
  description = "Create S3 bucket"
}

resource "aws_s3_bucket" "bucket_storage" {
  count = var.create_s3
  bucket = "${var.project}-site-storage"
  acl    = "public-read"

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
      identifiers = ["*"]
      type = "*"
    }

    resources = [
      "${aws_s3_bucket.bucket_storage[0].arn}/*",
    ]
  }
}
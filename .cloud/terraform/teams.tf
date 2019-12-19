## This conf exports tfstates in encrypted S3
terraform {
  backend "s3" {
    bucket               = "6cloud-tfstates"
    dynamodb_table       = "6cloud-tfstates-lock"
    encrypt              = true
    kms_key_id           = "arn:aws:kms:eu-west-3:908538848727:key/ae408c08-77b9-4670-8b68-7d7941208ff8"
    region               = "eu-west-3"
    profile              = "6cloud-services"
    workspace_key_prefix = ""
  }
}
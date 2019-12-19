variable "aws_profile" {
  type        = string
  description = "AWS profile to use"
}

variable "region" {
  type        = string
  description = "AWS Region to use"
  default     = "eu-west-3"
}

variable "team" {
  type        = string
  description = "Maintainer team"
  default     = "cytron"
}

variable "project" {
  type        = string
  description = "Name of the current project"
  default     = "lft-try-1"
}



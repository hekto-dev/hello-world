variable "name" {
  type = string
  description = "provide a name"
}

output "greeting" {
  value = "${var.name} is a great person"
}

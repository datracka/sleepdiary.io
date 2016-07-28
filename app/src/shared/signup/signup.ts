var validator = require("email-validator");

export class Login {
  name: string;
  email: string;
  password: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}
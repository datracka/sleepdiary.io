var validator = require("email-validator");

export class Login {
  email: string;
  password: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}
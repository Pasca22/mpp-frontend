import { User } from "@/model/user";

export type Errors = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  ip?: string;
};

export function userValidation(values: User) {
  const errors: Errors = {};

  const zeroTo255Regex = "(\\d{1,2}|(0|1)\\" + "d{2}|2[0-4]\\d|25[0-5])";
  const ipRegex =
    zeroTo255Regex +
    "\\." +
    zeroTo255Regex +
    "\\." +
    zeroTo255Regex +
    "\\." +
    zeroTo255Regex;

  const emailRegex =
    "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
    "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

  const passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$";

  if (values.id < 0) {
    errors.id = "ID must be a number greater than 0";
  }

  if (values.username === "") {
    errors.username = "Username is required";
  }

  if (values.email === "") {
    errors.email = "Email is required";
  } else if (!values.email.match(emailRegex)) {
    errors.email = "Invalid email address";
  }

  if (values.password === "") {
    errors.password = "Password is required";
  } else if (!values.password.match(passwordRegex)) {
    errors.password =
      "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers";
  }

  if (values.ip === "") {
    errors.ip = "IP is required";
  } else if (!values.ip.match(ipRegex)) {
    errors.ip = "Invalid IP address";
  }

  return errors;
}

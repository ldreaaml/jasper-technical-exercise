import * as yup from "yup";

export const userSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  termsAgree: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});

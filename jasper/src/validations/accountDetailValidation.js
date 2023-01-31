import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const accountSchema = yup.object({
  address: yup.string().required("A residential address is required"),
  phoneCode: yup.string().required("Phone number is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is notd valid"),
  citizenship: yup.string().required("Primary citizenship is required"),
  fundsAvailable: yup
    .string()
    .required("Funds available for investment is required"),
  termsAgreement: yup.bool().oneOf([true], "Accept these terms to continue"),
});

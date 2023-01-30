import * as yup from "yup";

export const accountSchema = yup.object({
  address: yup.string().required("A residential address is required"),
  phoneCode: yup.string().required("Phone number is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  citizenship: yup.string().required("Primary citizenship is required"),
  fundsAvailable: yup
    .string()
    .required("Funds available for investment is required"),
  termsAgreement: yup.bool().oneOf([true], "Accept these terms to continue"),
});

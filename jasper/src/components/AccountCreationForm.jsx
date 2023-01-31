import { useDispatch } from "react-redux";
import { accountCreationSuccess } from "../redux/form";
import { userSchema } from "../validations/userValidation";
import { useFormik } from "formik";
import Button from "./formComponents/Button";
import ErrorText from "./formComponents/ErrorText";
import InputField from "./formComponents/InputField";

const CreateAccountForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      termsAgreement: false,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log("user", values);
      dispatch(accountCreationSuccess());
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4 p-3">
        <h1 className="text-darkBlue text-2xl font-medium">
          Create An Account
        </h1>
        <span className="text-center">
          To view more information about this opportunity,
          <br />
          you must have an account with Jasper.
        </span>

        <form onSubmit={formik.handleSubmit} className="space-y-6 py-3">
          <div className="flex flex-row justify-between space-x-4">
            <label className="flex flex-col flex-1 text-gray-700 font-medium">
              Legal First Name
              <InputField
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={formik.touched.firstName && formik.errors.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <ErrorText text={formik.errors.firstName} />
              ) : null}
            </label>

            <label className="flex flex-col flex-1 text-gray-700 font-medium">
              Legal Last Name
              <InputField
                name="lastName"
                value={formik.values.lastName}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={formik.touched.lastName && formik.errors.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <ErrorText text={formik.errors.lastName} />
              ) : null}
            </label>
          </div>
          <label className="flex flex-col text-gray-700 font-medium">
            Email
            <InputField
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorText text={formik.errors.email} />
            ) : null}
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Password
            <InputField
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorText text={formik.errors.password} />
            ) : null}
          </label>
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-start pt-2">
              <input
                data-testid="termsAgreement"
                name="termsAgreement"
                className="rounded mt-2 bg-slate-400 p-2"
                type="checkbox"
                checked={formik.values.termsAgreement}
                onChange={(e) => {
                  formik.handleBlur(e);
                  formik.handleChange(e);
                }}
              />
              <label className="text-gray-700">
                By continuing I certify that I am 18 years of age, and I gree to
                the
                <a href="#" className="text-blue px-1">
                  Terms & condition
                </a>
                and
                <a href="#" className="text-blue px-1">
                  Privacy Policy.
                </a>
              </label>
            </div>
            {formik.touched.termsAgreement && formik.errors.termsAgreement ? (
              <ErrorText text={formik.errors.termsAgreement} />
            ) : null}
          </div>
          <Button
            text="Create Account"
            disabled={!formik.values.termsAgreement}
          />
        </form>
      </div>
    </>
  );
};

export default CreateAccountForm;

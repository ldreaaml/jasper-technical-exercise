import { useDispatch } from "react-redux";
import { accountDetailSuccess, hideForm } from "../redux/form";
import { useFormik } from "formik";
import { accountSchema } from "../validations/accountDetailValidation";
import Button from "./formComponents/Button";
import ErrorText from "./formComponents/ErrorText";
import InputField from "./formComponents/InputField";
import InternationalPhoneList from "../data/phoneCountryCode.json";

const AccountDetailForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      address: "",
      phoneCode: "",
      phoneNumber: "",
      citizenship: "",
      fundsAvailable: "",
      termsAgreement: false,
    },
    validationSchema: accountSchema,
    onSubmit: (values) => {
      console.log("accoutn", values);
      dispatch(accountDetailSuccess());
      dispatch(hideForm());
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-3 p-3">
        <h1 className="text-darkBlue text-2xl font-medium">
          Provide account details
        </h1>
        <span className="text-center text-sm">
          We just need a few bits of basic information to finish setting up your
          account. Complete the below to get access to the platform.
        </span>

        <form onSubmit={formik.handleSubmit} className="space-y-7">
          <label className="block text-gray-700 font-medium">
            Current residential address
            <InputField
              name="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.address && formik.errors.address}
            />
            {/* error  */}
            <div className="flex text-sm font-medium justify-between">
              {formik.touched.address && formik.errors.address ? (
                <ErrorText text={formik.errors.address} />
              ) : null}
              <div className="space-x-1 flex justify-end items-end w-full bg-red-300">
                {formik.touched.address && formik.errors.address ? null : (
                  <span className="font-normal text-sm h-0 bg-slate-200">
                    Can't find your address?
                  </span>
                )}
                <span className="text-blue text-sm font-semibold h-0">
                  Enter address manually
                </span>
              </div>
            </div>
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Phone
            <div className="flex flex-row items-center justify-center space-x-4">
              <select
                className={`border p-2 rounded font-normal focus:outline-blue ${
                  formik.touched.phoneCode && formik.errors.phoneCode
                    ? "border-error bg-lightPink"
                    : "border-gray-400"
                }`}
                name="phoneCode"
                defaultValue={"DEFAULT"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="DEFAULT" hidden></option>
                {InternationalPhoneList.map((val) => (
                  <option value={val.code} key={val.id}>
                    {`${val.country} (+${val.code})`}
                  </option>
                ))}
              </select>
              <InputField
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </div>
            {(formik.touched.phoneNumber && formik.errors.phoneNumber) ||
            (formik.touched.phoneCode && formik.errors.phoneCode) ? (
              <ErrorText text={formik.errors.phoneNumber} />
            ) : null}
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Primary Citizenship
            <select
              className={`border font-normal text-gray-900 text-sm rounded block w-full p-2.5 ${
                formik.touched.citizenship && formik.errors.citizenship
                  ? "border-error bg-lightPink"
                  : "border-gray-400"
              }`}
              name="citizenship"
              defaultValue={"DEFAULT"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="DEFAULT" hidden>
                Please select
              </option>
              {["New Zealand", "Australia", "United State", "China"].map(
                (val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                )
              )}
            </select>
            {formik.touched.citizenship && formik.errors.citizenship ? (
              <ErrorText text={formik.errors.citizenship} />
            ) : null}
          </label>

          <label className="block text-gray-700 font-medium">
            Funds available for investment
            <select
              className={`border font-normal text-gray-900  text-sm rounded block w-full p-2.5 ${
                formik.touched.fundsAvailable && formik.errors.fundsAvailable
                  ? "border-error bg-lightPink"
                  : "border-gray-400"
              }`}
              name="fundsAvailable"
              defaultValue={"DEFAULT"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="DEFAULT" hidden>
                Please select
              </option>
              {["Under $50k", "$50k-$250k", "$250k - $1M", "$1M+"].map(
                (val) => (
                  <option value={val} key={val} className="py-3">
                    {val}
                  </option>
                )
              )}
            </select>
            {formik.touched.fundsAvailable && formik.errors.fundsAvailable ? (
              <ErrorText text={formik.errors.fundsAvailable} />
            ) : null}
          </label>

          <div className="flex flex-col">
            <div className="flex flex-row space-x-3 items-start">
              <input
                className="rounded mt-2"
                data-testid="termsAgreement"
                name="termsAgreement"
                type="checkbox"
                checked={formik.values.termsAgreement}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="flex flex-row text-gray-700">
                I consent to my information being passed to and checked with the
                document issuer and any authorised third parties for the purpose
                of verifying my identity and address
              </label>
            </div>
            {formik.touched.termsAgreement && formik.errors.termsAgreement ? (
              <ErrorText text={formik.errors.termsAgreement} />
            ) : null}
          </div>
          <Button
            text="Complete now"
            disabled={!formik.values.termsAgreement}
          />
        </form>
      </div>
    </>
  );
};

export default AccountDetailForm;

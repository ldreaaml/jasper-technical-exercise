import { useState } from "react";
import { validateInput } from "../utils";
import { useDispatch } from "react-redux";
import { accountDetailSuccess, hideForm } from "../redux/form";
import Button from "./formComponents/Button";
import ErrorText from "./formComponents/ErrorText";
import InputField from "./formComponents/InputField";
import InternationalPhoneList from "../data/phoneCountryCode.json";

const AccountDetailForm = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState({ termsAgree: false });
  const [account, setAccount] = useState({
    address: "",
    phoneCode: "",
    phoneNumber: "",
    citizenship: "",
    fundsAvailable: "",
  });
  const { address, phoneNumber } = account;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(account)) {
      dispatch(accountDetailSuccess());
      dispatch(hideForm());
    } else {
      const errorField = Object.entries(account).reduce((acc, [key, value]) => {
        acc[key] = value === "";
        return acc;
      }, {});
      setIsTermsAccepted(false);
      setError({ ...errorField, termsAgree: true });
    }
    console.log("account details form", { ...account });
  };

  const handleTermsAccepted = (e) => {
    setIsTermsAccepted(!isTermsAccepted);
    setError({ ...error, termsAgree: false });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
    setError({ ...error, [name]: false });
  };

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

        <form onSubmit={handleSubmit} className="space-y-1">
          <label className="block text-gray-700 font-medium">
            Current residential address
            <InputField
              name="address"
              value={address}
              type="text"
              onChange={onChangeInput}
              isError={error.address}
            />
            <div className="flex text-sm font-medium justify-between">
              <span
                className={` text-error w-full ${
                  error.address ? "block" : "hidden"
                }`}
              >
                A residential address is required
              </span>
              <div className="space-x-1 flex justify-end items-center w-full">
                <span
                  className={`font-normal text-xs ${
                    error.address ? "hidden" : ""
                  }`}
                >
                  Can't find your address?
                </span>
                <span className="text-blue">Enter address manually</span>
              </div>
            </div>
          </label>
          <label className="block text-gray-700 font-medium ">
            Phone
            <div className="flex flex-row items-center justify-center space-x-4">
              <select
                className={`border p-2 rounded font-normal focus:outline-blue ${
                  error.phoneCode
                    ? "border-error bg-lightPink"
                    : "border-gray-400"
                }`}
                name="phoneCode"
                defaultValue={"DEFAULT"}
                onChange={onChangeInput}
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
                value={phoneNumber}
                onChange={onChangeInput}
                type="text"
                isError={error.phoneNumber}
              />
            </div>
            <ErrorText
              text="Phone number is required"
              isVisible={error.phoneCode || error.phoneNumber}
            />
          </label>

          <label className="block text-gray-700 font-medium">
            Primary Citizenship
            <select
              className={`border font-normal text-gray-900 text-sm rounded block w-full p-2.5 ${
                error.citizenship
                  ? "border-error bg-lightPink"
                  : "border-gray-400"
              }`}
              name="citizenship"
              defaultValue={"DEFAULT"}
              onChange={onChangeInput}
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
            <ErrorText
              text="Primary citizenship is required"
              isVisible={error.citizenship}
            />
          </label>

          <label className="block text-gray-700 font-medium">
            Funds available for investment
            <select
              className={`border font-normal text-gray-900  text-sm rounded block w-full p-2.5 ${
                error.fundsAvailable
                  ? "border-error bg-lightPink"
                  : "border-gray-400"
              }`}
              name="fundsAvailable"
              defaultValue={"DEFAULT"}
              onChange={onChangeInput}
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
            <ErrorText
              text="Funds available for investment is required"
              isVisible={error.fundsAvailable}
            />
          </label>

          {/* checkbox */}
          <div className="flex flex-row space-x-2 items-start">
            <input
              className="rounded mt-2 text-error"
              type="checkbox"
              checked={isTermsAccepted}
              onChange={handleTermsAccepted}
            />
            <label className="block text-gray-700">
              I consent to my information being passed to and checked with the
              document issuer and any authorised third parties for the purpose
              of verifying my identity and address
            </label>
          </div>
          <ErrorText
            text="Accept these terms to continue"
            isVisible={error.termsAgree}
          />
          <Button text="Complete now" disabled={!isTermsAccepted} />
        </form>
      </div>
    </>
  );
};

export default AccountDetailForm;

import React from "react";
import { useState } from "react";
import { containsEmptyString } from "../utils";
import { useDispatch } from "react-redux";
import { accountDetailSuccess, hideForm } from "../redux/form";

const AccountDetailForm = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);
  const [error, setError] = useState({ terms: false });
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
    }
    console.log({ ...account });
  };

  const validateInput = (obj) => {
    if (containsEmptyString(obj)) {
      const newObj = Object.entries(obj).reduce((acc, [key, value]) => {
        acc[key] = value === "";
        return acc;
      }, {});
      setIsTermsAccepted(false);
      setError({ ...newObj, terms: true });
      console.log({ ...newObj, terms: true });
      return false;
    }
    return true;
  };

  const handleTermsAccepted = (e) => {
    setIsTermsAccepted(!isTermsAccepted);
    setError({ ...error, terms: false });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
    setError({ ...error, [name]: false });
    console.log({ ...account });
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
            <input
              className={`border p-2 w-full rounded font-normal focus:outline-blue ${
                error.address ? "border-error bg-lightPink" : "border-gray-400"
              }`}
              name="address"
              value={address}
              type="text"
              onChange={onChangeInput}
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
          {/* phone */}
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
                {["+64", "+66", "+62"].map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
              <input
                className={`border p-2 w-full rounded font-normal focus:outline-blue ${
                  error.phoneNumber
                    ? "border-error bg-lightPink"
                    : "border-gray-400"
                }`}
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeInput}
              />
            </div>
            <span
              className={`text-sm text-error w-full ${
                error.phoneCode || error.phoneNumber
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              Phone number is required
            </span>
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
            <span
              className={`text-sm font-medium text-error ${
                error.citizenship ? "opacity-100" : "opacity-0"
              }`}
            >
              Primary citizenship is required
            </span>
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
            <span
              className={`text-sm font-medium text-error ${
                error.fundsAvailable ? "opacity-100" : "opacity-0"
              }`}
            >
              Funds available for investment is required
            </span>
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
          <span
            className={`text-sm font-medium text-error ${
              error.terms ? "opacity-100" : "opacity-0"
            }`}
          >
            Accept these terms to continue
          </span>

          <button
            className=" bg-blue font-medium text-white p-3 rounded w-full disabled:opacity-70 disabled:bg-slate-400"
            type="submit"
            disabled={!isTermsAccepted}
          >
            Complete now
          </button>
        </form>
      </div>
    </>
  );
};

export default AccountDetailForm;

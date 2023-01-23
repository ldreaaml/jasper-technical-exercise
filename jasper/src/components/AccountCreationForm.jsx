import React from "react";
import { useState } from "react";
import { validateInput } from "../utils";
import { useDispatch } from "react-redux";
import { accountCreationSuccess } from "../redux/form";
import Button from "./formComponents/Button";
import ErrorText from "./formComponents/ErrorText";
import InputField from "./formComponents/InputField";

const CreateAccountForm = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState({ termsAgree: false });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = user;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(user)) {
      dispatch(accountCreationSuccess());
    } else {
      const errorField = Object.entries(user).reduce((user, [key, value]) => {
        user[key] = value === "";
        return user;
      }, {});
      setIsTermsAccepted(false);
      setError({ ...errorField, termsAgree: true });
    }
    console.log("account creation form", { ...user });
  };

  const handleTermsAccepted = (e) => {
    setIsTermsAccepted(!isTermsAccepted);
    setError({ ...error, termsAgree: false });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError({ ...error, [name]: false });
  };

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

        <form onSubmit={handleSubmit} className="space-y-1 py-3">
          <div className="flex flex-row items-center justify-center space-x-4">
            <label className="block text-gray-700 font-medium ">
              Legal First Name
              <InputField
                name="firstName"
                value={firstName}
                type="text"
                onChange={onChangeInput}
                isError={error.firstName}
              />
              <ErrorText
                text="First Name is required"
                isVisible={error.firstName}
              />
            </label>

            <label className="block text-gray-700 font-medium">
              Legal Last Name
              <InputField
                name="lastName"
                value={lastName}
                type="text"
                onChange={onChangeInput}
                isError={error.lastName}
              />
              <ErrorText
                text="Last Name is required"
                isVisible={error.lastName}
              />
            </label>
          </div>
          <label className="block text-gray-700 font-medium">
            Email
            <InputField
              name="email"
              value={email}
              type="email"
              onChange={onChangeInput}
              isError={error.email}
            />
            <ErrorText text="Email is required" isVisible={error.email} />
          </label>
          <label className="block text-gray-700 font-medium">
            Password
            <InputField
              name="password"
              value={password}
              type="password"
              onChange={onChangeInput}
              isError={error.password}
            />
            <ErrorText text="Password is required" isVisible={error.password} />
          </label>
          <div className="flex flex-row space-x-2 items-start">
            <input
              data-testid="termsAgreement"
              className="rounded mt-2"
              type="checkbox"
              checked={isTermsAccepted}
              onChange={handleTermsAccepted}
            />
            <label className="block text-gray-700">
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
          <ErrorText
            text="Accept these terms to continue"
            isVisible={error.termsAgree}
          />
          <Button text="Create Account" disabled={!isTermsAccepted} />
        </form>
      </div>
    </>
  );
};

export default CreateAccountForm;

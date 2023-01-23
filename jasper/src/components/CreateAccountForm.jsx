import React from "react";
import { useState } from "react";
import { containsEmptyString } from "../utils";

const CreateAccountForm = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);
  const [error, setError] = useState({ terms: false });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInput(user);
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
    }
  };

  const handleTermsAccepted = (e) => {
    setIsTermsAccepted(!isTermsAccepted);
    setError({ ...error, terms: false });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError({ ...error, [name]: false });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-3  p-3">
        <h1 className="text-darkBlue text-2xl font-medium">
          Create An Account
        </h1>
        <span className="text-center">
          To view more information about this opportunity,
          <br />
          you must have an account with Jasper.
        </span>

        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="flex flex-row items-center justify-center space-x-4">
            <label className="block text-gray-700 font-medium ">
              Legal First Name
              <input
                className={`border p-2 w-full rounded font-normal focus:outline-blue ${
                  error.firstName
                    ? "border-error bg-lightPink"
                    : "border-gray-400"
                }`}
                name="firstName"
                value={firstName}
                type="text"
                onChange={onChangeInput}
              />
              <span
                className={`text-sm font-medium text-error ${
                  error.firstName ? "opacity-100" : "opacity-0"
                }`}
              >
                First Name is required
              </span>
            </label>

            <label className="block text-gray-700 font-medium ">
              Legal Last Name
              <input
                className={`border p-2 w-full rounded font-normal focus:outline-blue ${
                  error.lastName
                    ? "border-error bg-lightPink"
                    : "border-gray-400"
                }`}
                name="lastName"
                value={lastName}
                type="text"
                onChange={onChangeInput}
              />
              <span
                className={`text-sm font-medium text-error ${
                  error.lastName ? "opacity-100" : "opacity-0"
                }`}
              >
                Last Name is required
              </span>
            </label>
          </div>
          <label className="block text-gray-700 font-medium">
            Email
            <input
              className={`border p-2 w-full rounded font-normal focus:outline-blue ${
                error.email ? "border-error bg-lightPink" : "border-gray-400"
              }`}
              name="email"
              value={email}
              type="email"
              onChange={onChangeInput}
            />
            <span
              className={`text-sm font-medium text-error ${
                error.email ? "opacity-100" : "opacity-0"
              }`}
            >
              Email is required
            </span>
          </label>
          <label className="block text-gray-700 font-medium">
            Password
            <input
              className={`border p-2 w-full rounded font-normal focus:outline-blue ${
                error.password ? "border-error bg-lightPink" : "border-gray-400"
              }`}
              name="password"
              value={password}
              type="password"
              onChange={onChangeInput}
            />
            <span
              className={`text-sm font-medium text-error ${
                error.password ? "opacity-100" : "opacity-0"
              }`}
            >
              Password is required
            </span>
          </label>
          <div className="flex flex-row space-x-2 items-start">
            <input
              className="rounded mt-2"
              type="checkbox"
              checked={isTermsAccepted}
              onChange={handleTermsAccepted}
            />
            <label className="block text-gray-700">
              By continuing I certify that I am 18 years of age, and I gree to
              the
              <a href="#" className="text-blue">
                Terms & condition
              </a>
              and
              <a href="#" className="text-blue">
                Privacy Policy.
              </a>
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
            className="bg-blue font-medium text-white p-3 rounded w-full disabled:opacity-70 disabled:bg-slate-400"
            type="submit"
            disabled={!isTermsAccepted}
          >
            Create account
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateAccountForm;

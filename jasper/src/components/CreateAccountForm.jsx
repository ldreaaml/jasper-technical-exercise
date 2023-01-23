import React from "react";
import { useState } from "react";

const CreateAccountForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
  };

  const handleTermsAccepted = (e) => {
    setIsTermsAccepted(!isTermsAccepted);
  };
  return (
    <>
      <div className="bg-white max-w-lg flex flex-col justify-center items-center p-6 space-y-3 rounded-md">
        <h1 className="text-darkBlue text-2xl font-medium">
          Create An Account
        </h1>
        <span className="text-center">
          To view more information about this opportunity,
          <br />
          you must have an account with Jasper.
        </span>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-3">
          <div className="flex flex-row items-center justify-center space-x-4">
            <label className="block text-gray-700 font-medium ">
              Legal First Name
              <input
                className="border border-gray-400 p-2 w-full rounded font-normal focus:outline-blue"
                type="text"
              />
            </label>
            <label className="block text-gray-700 font-medium">
              Legal Last Name
              <input
                className="border border-gray-400 p-2 w-full rounded font-normal focus:outline-blue"
                type="text"
              />
            </label>
          </div>
          <label className="block text-gray-700 font-medium">
            Email
            <input
              className="border border-gray-400 p-2 w-full rounded font-normal focus:outline-blue"
              type="email"
            />
          </label>
          <label className="block text-gray-700 font-medium">
            Password
            <input
              className="border border-gray-400 p-2 w-full rounded font-normal focus:outline-blue"
              type="password"
            />
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

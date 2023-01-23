import React from "react";

const InputField = ({ name, value, onChange, type, isError }) => {
  return (
    <input
      className={`border p-2 w-full rounded font-normal focus:outline-blue ${
        isError ? "border-error bg-lightPink" : "border-gray-400"
      }`}
      data-testid={name}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default InputField;

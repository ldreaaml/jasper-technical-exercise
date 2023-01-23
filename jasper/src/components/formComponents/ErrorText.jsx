import React from "react";

const ErrorText = ({ text, isVisible }) => {
  return (
    <span
      className={`text-sm font-medium w-full text-error ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {text}
    </span>
  );
};

export default ErrorText;

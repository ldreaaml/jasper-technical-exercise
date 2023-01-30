import React from "react";

const ErrorText = ({ text }) => {
  return (
    <span className={`h-0 text-sm font-medium w-full text-error`}>{text}</span>
  );
};

export default ErrorText;

import React from "react";

const Button = ({ text, disabled }) => {
  return (
    <button
      className="bg-blue font-medium text-white p-3 rounded w-full disabled:opacity-70 disabled:bg-slate-400"
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

import { useState } from "react";
import CreateAccountForm from "./CreateAccountForm";

const PopUp = () => {
  return (
    <>
      <div className="bg-slate-300 p-3 flex justify-center">
        <div className="bg-white max-w-lg p-6 rounded-md">
          <CreateAccountForm />
        </div>
      </div>
    </>
  );
};

export default PopUp;

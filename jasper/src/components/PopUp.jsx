import { useState } from "react";
import AccountDetailForm from "./AccountDetailForm";
import CreateAccountForm from "./CreateAccountForm";

const PopUp = () => {
  return (
    <>
      <div className="bg-slate-300 p-3 flex justify-center">
        <div className="bg-white max-w-lg p-6 rounded-md">
          {/* <CreateAccountForm /> */}
          <AccountDetailForm />
        </div>
      </div>
    </>
  );
};

export default PopUp;

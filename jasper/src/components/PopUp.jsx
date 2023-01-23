import { useState } from "react";
import CreateAccountForm from "./CreateAccountForm";

const PopUp = () => {
  return (
    <>
      <div className="bg-slate-300 p-3 flex justify-center">
        <CreateAccountForm />
      </div>
    </>
  );
};

export default PopUp;

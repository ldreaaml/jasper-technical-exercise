import AccountDetailForm from "./AccountDetailForm";
import CreateAccountForm from "./AccountCreationForm";
import { useDispatch, useSelector } from "react-redux";
import { formReset } from "../redux/form";

const PopUp = () => {
  const isFormVisible = useSelector((state) => state.form.formVisible);
  const formSuccess = useSelector((state) => state.form.accountCreationSuccess);
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(formReset());
  };

  return (
    <>
      {isFormVisible ? (
        <div
          className="relative z-10"
          aria-labelledby="account-creation-modal"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <button
                  className="absolute right-2 top-0 p-3 font-medium text-xl text-gray-400"
                  data-testid="close-button"
                  onClick={closePopup}
                >
                  x
                </button>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {!formSuccess ? <CreateAccountForm /> : <AccountDetailForm />}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        </div>
      ) : null}
    </>
  );
};

export default PopUp;

import AccountDetailForm from "./AccountDetailForm";
import CreateAccountForm from "./AccountCreationForm";
import { useDispatch, useSelector } from "react-redux";
import { formReset } from "../redux/form";

const PopUp = () => {
  const visibility = useSelector((state) => state.form.formVisible);
  const formSuccess = useSelector((state) => state.form.accountCreationSuccess);
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(formReset());
  };

  return (
    <>
      {visibility ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <button
                  className="absolute right-2 top-0 p-3 font-medium text-xl text-gray-400 cursor-pointer"
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
        </div>
      ) : null}
    </>
  );
};

export default PopUp;

import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../redux/form";
import { FaRegUserCircle } from "react-icons/fa";
import PopUp from "./PopUp";

const NavBar = () => {
  const dispatch = useDispatch();

  const accountCreationSuccess = useSelector(
    (state) => state.form.accountCreationSuccess
  );
  const accountDetailSuccess = useSelector(
    (state) => state.form.accountDetailSuccess
  );

  const showPopup = () => {
    dispatch(showForm());
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-blue p-3 px-20">
        <p className="text-white text-4xl font-medium">Jasper</p>
        {accountCreationSuccess && accountDetailSuccess ? (
          <>
            <div className="text-white space-x-12">
              <a href="#" className="opacity-80 hover:opacity-100">
                Opportunities
              </a>
              <a href="#" className="opacity-80 hover:opacity-100">
                My Portfolio
              </a>
              <a href="#" className="opacity-80 hover:opacity-100">
                Notificatoins
              </a>
            </div>
            <FaRegUserCircle className="text-white text-3xl" />
          </>
        ) : (
          <>
            <button
              data-testid="create-account-button"
              className="font-medium bg-transparent text-white border border-white py-2 px-4 rounded hover:bg-white hover:text-blue"
              onClick={showPopup}
            >
              Create Account
            </button>
          </>
        )}
      </nav>
      <PopUp />
    </>
  );
};

export default NavBar;

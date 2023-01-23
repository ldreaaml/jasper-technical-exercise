import { useState } from "react";

const NavBar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const onClick = () => {
    setIsPopupVisible(true);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-blue p-3 px-12">
        <p className="text-white text-4xl">Jasper</p>
        <button className="font-medium bg-transparent text-white border border-white py-2 px-4 rounded hover:bg-white hover:text-blue">
          Create Account
        </button>
      </div>
    </>
  );
};

export default NavBar;

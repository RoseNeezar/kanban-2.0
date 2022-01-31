import React from "react";

const NavActions = () => {
  return (
    <>
      <ul tw="items-center justify-center hidden md:flex mr-2">
        <li>
          <div tw="relative grid p-3 mx-1 text-xl bg-gray-200 rounded-full cursor-pointer place-items-center  hover:bg-indigo-500 hover:text-dark-txt">
            <i className="bx bx-log-out-circle"></i>
          </div>
        </li>
      </ul>
    </>
  );
};

export default NavActions;

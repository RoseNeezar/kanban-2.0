import React from "react";
import { Link, useLocation } from "react-router-dom";
import tw from "twin.macro";

const NavNavigate = () => {
  const kanbanRoute = "/kanban";
  const calendarRoute = "/calendar";
  const { pathname } = useLocation();

  return (
    <>
      <ul tw="flex items-center justify-center w-full lg:w-max">
        <li
          css={[
            tw`w-1/5 text-center text-gray-600 md:w-max xl:hidden`,
            pathname.includes(kanbanRoute) &&
              tw`text-indigo-500 border-b-4 border-indigo-500`,
          ]}
        >
          <Link
            to={`kanban`}
            tw="relative inline-block w-full px-3 py-2 text-3xl text-center  rounded cursor-pointer xl:px-12 hover:bg-gray-100"
          >
            <i className="bx bxs-package"></i>
          </Link>
        </li>
        <li
          css={[
            tw`w-1/5 text-center text-gray-600 md:w-max xl:hidden`,
            pathname.includes(calendarRoute) &&
              tw`text-indigo-500 border-b-4 border-indigo-500 `,
          ]}
        >
          <Link
            to={`calendar`}
            tw="relative inline-block w-full px-3 py-2 text-3xl text-center  rounded cursor-pointer xl:px-12 hover:bg-gray-100"
          >
            <i className="bx bx-calendar"></i>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavNavigate;

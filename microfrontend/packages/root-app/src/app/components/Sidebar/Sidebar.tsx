import { useAuthStore } from "@store/useAuth.store";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import tw from "twin.macro";

const Sidebar = () => {
  const kanbanRoute = "/kanban";
  const calendarRoute = "/calendar";
  const { pathname } = useLocation();

  return (
    <>
      <ul tw="flex flex-col items-center justify-evenly h-1/2">
        <li
          css={[
            tw`flex justify-center w-3/4 py-2 ml-5 mr-auto rounded-3xl hover:bg-indigo-500`,
            pathname.includes(kanbanRoute) && tw`bg-indigo-500 `,
          ]}
        >
          <Link
            to={`kanban`}
            tw="text-center text-2xl  text-dark-txt flex justify-center xl:justify-start items-center"
          >
            <i className="bx bxs-package"></i>
            <span tw="pl-2 hidden xl:inline-block">Kanban</span>
          </Link>
        </li>

        <li
          css={[
            tw`flex justify-center w-3/4 py-2 ml-5 mr-auto rounded-3xl hover:bg-indigo-500`,
            pathname.includes(calendarRoute) && tw`bg-indigo-500 `,
          ]}
        >
          <Link
            to={`calendar`}
            tw="text-center text-2xl  text-dark-txt flex justify-center xl:justify-start items-center"
          >
            <i className="bx bx-calendar"></i>
            <span tw="pl-2 hidden xl:inline-block">Calendar</span>
          </Link>
        </li>

        <li tw="mt-6 border-b border-gray-200 "></li>
      </ul>
    </>
  );
};

export default Sidebar;

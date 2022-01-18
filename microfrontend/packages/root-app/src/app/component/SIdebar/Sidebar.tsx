import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const kanbanRoute = "/kanban";
  const calendarRoute = "/calendar";

  return (
    <div tw="flex flex-col w-64 bg-dark-third rounded-r-3xl overflow-hidden">
      <div tw="flex items-center justify-center h-20 shadow-md">
        <h1 tw="text-3xl uppercase text-indigo-500 tracking-widest">Junbi</h1>
      </div>
      <ul tw="flex flex-col py-4 ml-3  space-y-10">
        <li>
          <Link
            to={`kanban`}
            tw=" mx-auto w-min relative flex flex-row items-center h-12  text-gray-500 hover:bg-dark-second rounded-xl pr-5"
          >
            {pathname.includes(kanbanRoute) && (
              <div tw="w-1 rounded-lg h-10 bg-indigo-500 absolute top-1 left-0"></div>
            )}
            <span tw="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bxs-package"></i>
            </span>
            <span tw="text-xl text-dark-txt font-medium">Kanban</span>
          </Link>
        </li>
        <li>
          <Link
            to={`kanban`}
            tw=" mx-auto w-min  relative flex flex-row items-center h-12  text-gray-500 hover:bg-dark-second rounded-xl pr-5"
          >
            {pathname.includes(calendarRoute) && (
              <div tw="w-1 rounded-lg h-10 bg-indigo-500 absolute top-1 left-0"></div>
            )}
            <span tw="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-calendar"></i>
            </span>
            <span tw="text-xl text-dark-txt font-medium">Calendar</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

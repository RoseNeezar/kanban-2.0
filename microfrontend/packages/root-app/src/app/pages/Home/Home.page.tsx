import Navbar from "@components/Navbar/Navbar";
import Sidebar from "@components/Sidebar/Sidebar";
import { useRemoteStore } from "@store/useRemoteStore";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Profile from "./components/Profile";

const Home: React.FC = () => {
  const location = useLocation();
  // useSocket();
  const { sidebarStatus } = useRemoteStore();

  return (
    <div tw="bg-dark-main">
      <Navbar />
      <div tw="flex justify-center h-screen">
        {sidebarStatus ? (
          <div tw="fixed top-0 left-0 flex-col hidden w-1/6 h-full pt-16 xl:flex ">
            <Sidebar />
          </div>
        ) : null}

        <div tw="w-full  pt-32  lg:w-2/3 xl:w-4/6 lg:pt-16">
          <Outlet />
        </div>
        {sidebarStatus ? (
          <div tw="fixed top-0 right-0 hidden w-1/6 h-full px-4 pt-16 xl:block ">
            <Profile />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;

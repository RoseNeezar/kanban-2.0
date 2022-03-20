import Navbar from "@components/Navbar/Navbar";
import Sidebar from "@components/Sidebar/Sidebar";
import { useRemoteStore } from "@store/useRemoteStore";
import useSocket, { getSocket } from "@store/websockets/websockets";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Profile from "./components/Profile";

const Home: React.FC = () => {
  const location = useLocation();

  const { sidebarStatus } = useRemoteStore();

  return (
    <div tw="bg-dark-main">
      <Navbar />
      <div tw="flex justify-center h-full ">
        {sidebarStatus ? (
          <div tw="fixed top-0 left-0 flex-col hidden w-1/6 h-full pt-16 xl:flex bg-dark-main">
            <Sidebar />
          </div>
        ) : null}

        <div tw="w-full  pt-32 h-screen  xl:w-4/6 lg:pt-16">
          <Outlet />
        </div>
        {sidebarStatus ? (
          <div tw="fixed top-0 right-0 hidden w-1/6 h-full px-4 pt-16 xl:block bg-dark-main">
            <Profile />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;

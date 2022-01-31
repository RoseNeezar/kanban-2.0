import Navbar from "@components/Navbar/Navbar";
import Sidebar from "@components/Sidebar/Sidebar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();
  // useSocket();
  return (
    <div tw="bg-dark-main">
      <Navbar />
      <div tw="flex justify-center h-screen">
        <div tw="fixed top-0 left-0 flex-col hidden w-1/6 h-full pt-16 xl:flex">
          <Sidebar />
        </div>
        <div tw="w-full px-2 pt-32  lg:w-2/3 xl:w-4/6 lg:pt-16">
          <Outlet />
        </div>
        <div tw="fixed top-0 right-0 hidden w-1/6 h-full px-4 pt-16 xl:block">
          <h1 tw="text-white">Profile</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

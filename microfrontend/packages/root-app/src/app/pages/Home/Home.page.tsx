import Sidebar from "@component/SIdebar/Sidebar";
import useSocket from "@store/websockets/websockets";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();
  useSocket();
  return (
    <div tw="min-h-screen flex flex-row bg-dark-main">
      <Sidebar />
      <div tw="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

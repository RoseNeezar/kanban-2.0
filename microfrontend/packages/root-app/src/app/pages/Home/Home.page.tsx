import Sidebar from "@component/SIdebar/Sidebar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();

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

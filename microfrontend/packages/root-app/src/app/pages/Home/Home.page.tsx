import React from "react";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <div tw="">
      <h1>App Page</h1>
      <Outlet />
    </div>
  );
};

export default Home;

import React from "react";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <div tw="min-h-screen bg-dark-main flex justify-center items-center w-full text-white">
      Kanban
    </div>
  );
};

export default Home;

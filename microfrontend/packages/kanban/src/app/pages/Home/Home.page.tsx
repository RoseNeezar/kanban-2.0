import React from "react";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <div tw="min-h-screen bg-gray-400 flex justify-center items-center ">
      Kanban
    </div>
  );
};

export default Home;

import React from "react";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <div tw="min-h-screen bg-dark-main flex justify-center items-center w-full text-white">
      load Kanban reloads agains tier what air one hdeed onde
    </div>
  );
};

export default Home;

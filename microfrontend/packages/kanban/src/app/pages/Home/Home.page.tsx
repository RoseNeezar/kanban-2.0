import React from "react";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <div tw="min-h-screen bg-dark-main flex justify-center items-center w-full text-purple-300">
      beats
      <div tw="w-96 h-96  bg-green-200">boxes</div>
    </div>
  );
};

export default Home;

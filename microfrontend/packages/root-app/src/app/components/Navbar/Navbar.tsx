import React from "react";
import NavActions from "./components/NavActions";
import NavNavigate from "./components/NavNavigate";
import NavSearch from "./components/NavLogo";

const Navbar = () => {
  return (
    <nav tw="fixed top-0 z-50 flex flex-col items-center justify-center w-full max-h-full bg-dark-third border-b shadow md:h-14 md:flex-row md:justify-between border-dark-second">
      <NavSearch />
      <NavNavigate />
      <NavActions />
    </nav>
  );
};

export default Navbar;

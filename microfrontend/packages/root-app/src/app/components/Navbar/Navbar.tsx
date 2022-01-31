import React from "react";
import NavActions from "./components/NavActions";
import NavNavigate from "./components/NavNavigate";
import NavLogo from "./components/NavLogo";
import { useRemoteStore } from "@store/useRemoteStore";

const Navbar = () => {
  const { sidebarStatus } = useRemoteStore();
  return (
    <nav tw="fixed top-0 z-50 flex flex-col items-center justify-center w-full max-h-full bg-dark-third border-b shadow md:h-14 md:flex-row md:justify-between border-dark-second">
      <NavLogo />
      {sidebarStatus ? <NavNavigate /> : null}
      <NavActions />
    </nav>
  );
};

export default Navbar;

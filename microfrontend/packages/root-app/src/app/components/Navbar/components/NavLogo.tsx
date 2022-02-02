import { useAuthStore } from "@store/useAuth.store";
import React from "react";
import { useHistory } from "../../../../bootstrap";

const NavSearch = () => {
  const { logout } = useAuthStore();

  return (
    <div tw="flex items-center justify-between w-full px-4 py-2 md:w-max ">
      <h1
        onClick={() => useHistory.push("/landing")}
        tw="mr-2 md:inline-block text-3xl uppercase text-indigo-500 tracking-widest cursor-pointer"
      >
        JUNBI
      </h1>
      <div
        onClick={() => logout()}
        tw="md:hidden relative grid p-3 mx-1 text-xl bg-gray-200 rounded-full cursor-pointer place-items-center hover:bg-indigo-500 hover:text-dark-txt"
      >
        <i className="bx bx-log-out-circle"></i>
      </div>
    </div>
  );
};

export default NavSearch;

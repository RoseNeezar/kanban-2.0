import { useAuthStore } from "@store/useAuth.store";
import React from "react";

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <div tw="bg-dark-third rounded-lg w-full mt-10">
      <div tw="py-3">
        <div tw="text-4xl text-indigo-500 mx-auto  w-20 h-20 rounded-full bg-dark-main flex items-center justify-center">
          <i className="bx bx-ghost"></i>
        </div>
        <div tw="text-xl p-2 text-dark-txt bg-dark-main m-2 rounded-xl text-center">
          {user.username}
        </div>
        <div tw="flex flex-row justify-between text-xl p-2 text-dark-txt bg-dark-main m-2 rounded-xl text-center ">
          <div className="pulse " />
          <div className="pulse " />
          <div className="pulse " />
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { Dispatch, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (user: any, dispatch: Dispatch<any>) => {
  useEffect(() => {
    const socket = io("http://localhost:3030", {
      path: "/kanban/socket.io",
    });

    // dispatch(setSocket(socket));

    socket.emit("setup", user);
  }, []);
};

export default useSocket;

import { useAppDispatch } from "@store/hooks/hooks";
import { setSocketLoaded } from "@store/module/kanban/kanban.slice";
import { Dispatch, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (user: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket = io("http://localhost:3030", {
      path: "/kanban/socket.io",
    });

    // dispatch(setSocket(socket));

    socket.emit("setup", user);

    socket.on("connected", () => {
      dispatch(setSocketLoaded());
    });
  }, []);
};

export default useSocket;

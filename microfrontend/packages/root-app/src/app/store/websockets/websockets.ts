import { useSocketStore } from "@store/useSocket.store";
import { useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { io } from "socket.io-client";

export const getSocket = () =>
  new ReconnectingWebSocket("ws://localhost:3030/kanban/socket.io");

const useSocket = () => {
  const { setSocket } = useSocketStore();
  useEffect(() => {
    const socket = io("http://localhost:3030", {
      path: "/kanban/socket.io",
    });

    setSocket(socket);

    socket.emit("setup", "myid");

    socket.on("connection", (message: string) => {
      console.log(message);
    });
  }, []);
};

export default useSocket;

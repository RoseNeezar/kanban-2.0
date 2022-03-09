import { useSocketStore } from "@store/useSocket.store";
import React from "react";

const KanbanCreateList: React.FC<{ boardId: string }> = ({ boardId }) => {
  const [title, setTitle] = React.useState("");
  const { socket } = useSocketStore();
  const handleCreateList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.length > 0) {
      socket?.emit("create-list", {
        title,
        boardId,
      });
      setTitle("");
    }
  };
  return (
    <div tw="bg-purple-500 h-full">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => handleCreateList(e)}
      />
    </div>
  );
};

export default KanbanCreateList;

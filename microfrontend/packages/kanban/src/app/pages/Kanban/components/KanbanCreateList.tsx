import { useSocketStore } from "@store/useSocket.store";
import React from "react";
import { useCreateList } from "../hooks/useList";

const KanbanCreateList: React.FC<{ boardId: string }> = ({ boardId }) => {
  const [title, setTitle] = React.useState("");
  const { createList } = useCreateList();
  const { socket } = useSocketStore();

  const handleCreateList = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.length > 0) {
      await createList({
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

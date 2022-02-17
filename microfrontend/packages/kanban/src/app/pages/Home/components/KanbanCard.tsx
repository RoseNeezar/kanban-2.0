import { useAppDispatch } from "@store/hooks/hooks";
import { deleteBoard } from "@store/module/kanban/kanban.slice";
import React, { FC } from "react";

interface IKanbanCard {
  _id: string;
  title: string;
}

const KanbanCard: FC<IKanbanCard> = (res) => {
  const dispatch = useAppDispatch();
  const HandleDelete = (boardId: string) => {
    dispatch(
      deleteBoard({
        boardId,
      })
    );
  };
  return (
    <div tw="p-3 rounded-md bg-dark-third" key={res._id}>
      <div tw="flex justify-end ">
        <button
          tw="text-3xl rounded-full text-dark-main hover:text-gray-200"
          onClick={() => HandleDelete(res._id)}
        >
          <i className=" bx bxs-x-circle"></i>
        </button>
      </div>

      <button
        tw="w-full h-20 rounded-md hover:text-black hover:bg-gray-200 bg-dark-second text-dark-txt"
        onClick={() => res._id}
      >
        {res.title}
      </button>
    </div>
  );
};

export default KanbanCard;

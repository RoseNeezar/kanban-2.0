import useFormInput from "@shared-hooks/useFormInput";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { createBoard, fetchBoards } from "@store/module/kanban/kanban.slice";
import { RootState } from "@store/store";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanCard from "./components/KanbanCard";

const Home = () => {
  const navigate = useNavigate();
  const KanbanBoards = useAppSelector(
    (state: RootState) => state.kanban.boards
  );
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<any>({});

  const {
    onChangeText,
    resetText,
    fields: { title },
  } = useFormInput({
    title: "",
  });

  const HandleCreateBoard = async () => {
    dispatch(
      createBoard({
        title,
      })
    );
    resetText();
  };

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  return (
    <div tw="bg-dark-main flex flex-col items-center justify-center w-full mt-10 overflow-hidden  ">
      <div tw="flex flex-col items-center ">
        <p tw="text-2xl text-dark-txt">Create Board</p>
        <div tw="flex flex-row items-center">
          <input
            tw="p-2 mt-8 mb-8 rounded-md w-96"
            type="title"
            value={title}
            onChange={onChangeText("title")}
          />
          <button
            onClick={() => HandleCreateBoard()}
            tw="w-20 h-10 ml-4 cursor-pointer hover:bg-dark-second rounded-xl bg-dark-third text-dark-txt"
          >
            Create
          </button>
        </div>
      </div>

      <div tw="grid justify-center w-full grid-flow-row gap-10 overflow-scroll auto-rows-min grid-rows-min grid-cols-fit">
        {KanbanBoards.filter((fil: any) => fil.title !== "").map((res: any) => (
          <KanbanCard {...res} />
        ))}
      </div>
    </div>
  );
};

export default Home;

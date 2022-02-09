import useFormInput from "@shared-hooks/useFormInput";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { createBoard, fetchBoards } from "@store/module/kanban/kanban.slice";
import { RootState } from "@store/store";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Devices from "../../../assets/bg.svg";

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
      <div tw="w-full xl:w-3/5 py-6 overflow-y-hidden">
        <img tw="w-5/6 mx-auto lg:mr-0 " src={Devices} alt="_" />
      </div>
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
          <div tw="p-3 rounded-md bg-dark-third" key={res._id}>
            <div tw="flex justify-end ">
              <button
                tw="text-3xl rounded-full text-dark-main hover:text-gray-200"
                onClick={() => res._id}
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
        ))}
      </div>
    </div>
  );
};

export default Home;

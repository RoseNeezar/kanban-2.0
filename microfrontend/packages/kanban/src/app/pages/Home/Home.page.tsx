import { useAppSelector } from "@store/hooks/hooks";
import { RootState } from "@store/store";
import React, { ChangeEvent, useState } from "react";

const Home = () => {
  const KanbanBoards = useAppSelector(
    (state: RootState) => state.kanban.boards
  );
  const [boardTitle, setBoardTitle] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formState;

  const onChangeText =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState({ ...formState, [name]: e.target.value });
    };

  return (
    <div tw="flex flex-col items-center justify-center w-full mt-10 overflow-hidden  ">
      <div tw="flex flex-col items-center ">
        <p tw="text-2xl text-dark-txt">Create Board</p>
        <div tw="flex flex-row items-center">
          <input
            tw="p-2 mt-8 mb-8 rounded-md w-96"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            onKeyDown={(e) => {}}
          />
          <button
            onClick={() => {}}
            tw="w-20 h-10 ml-4 cursor-pointer hover:bg-dark-second rounded-xl bg-dark-third text-dark-txt"
          >
            Create
          </button>
        </div>
      </div>

      <div tw="grid justify-center w-full grid-flow-row gap-10 overflow-scroll auto-rows-min grid-rows-min grid-cols-fit">
        {KanbanBoards.filter((fil) => fil.title !== "").map((res) => (
          <div tw="p-2 rounded-md bg-dark-third" key={res._id}>
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

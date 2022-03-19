import queryApi from "@api/queryApi";
import { allTaskKey, currentBoardKey } from "@api/queryKey";
import { IGetAllListFromBoard } from "@store/types/kanban.types";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetBoardList = (boardId: string) => {
  const { data, isLoading } = useQuery(currentBoardKey, () =>
    queryApi.listService.getBoardList(boardId).then((re) => re)
  );
  const { data: Tasks, isLoading: TaskLoading } = useQuery(
    allTaskKey,
    () =>
      queryApi.listService
        .getAllTaskFromList(data!.board.kanbanListOrder)
        .then((re) => re),
    {
      enabled: data && data?.board.kanbanListOrder.length > 0,
    }
  );
  return {
    currentBoard: data,
    allTask: Tasks,
    isLoading: TaskLoading && isLoading,
  };
};

export const useCreateList = () => {
  const cache = useQueryClient();

  const { mutateAsync } = useMutation(
    (data: { title: string; boardId: string }) =>
      queryApi.listService.createList(data.title, data.boardId),
    {
      onSuccess: (result) => {
        console.log("useCreateList--", result);
        cache.invalidateQueries(currentBoardKey);
      },
    }
  );
  return {
    createList: mutateAsync,
  };
};

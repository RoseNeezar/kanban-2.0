import queryApi from "@api/queryApi";
import { currentBoardKey } from "@api/queryKey";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetBoardList = (boardId: string) => {
  const { data, isLoading } = useQuery(currentBoardKey, () =>
    queryApi.listService.getBoardList(boardId).then((re) => re)
  );

  return {
    currentBoard: data,
    isLoading,
  };
};

export const useCreateList = () => {
  const cache = useQueryClient();

  const { mutateAsync } = useMutation(
    (data: { title: string; boardId: string }) =>
      queryApi.listService.createList(data.title, data.boardId),
    {
      onSuccess: (result) => {
        cache.invalidateQueries(currentBoardKey);
      },
    }
  );
  return {
    createList: mutateAsync,
  };
};

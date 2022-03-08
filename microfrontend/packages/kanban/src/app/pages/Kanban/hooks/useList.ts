import queryApi from "@api/queryApi";
import { currentBoardKey } from "@api/queryKey";
import { useQuery } from "react-query";

export const useGetBoardList = (boardId: string) => {
  const { data, isLoading } = useQuery(currentBoardKey, () =>
    queryApi.listService.getBoardList(boardId).then((re) => re)
  );

  return {
    currentBoard: data,
    isLoading,
  };
};

import queryApi from "@api/queryApi";
import { currentBoardKey } from "@api/queryKey";
import { useSocketStore } from "@store/useSocket.store";
import useSocket from "@store/websockets/websockets";
import { useQuery } from "react-query";
import { useEffect } from "react";

export const useGetBoardList = (boardId: string) => {
  const { data, isLoading } = useQuery(currentBoardKey, () =>
    queryApi.listService.getBoardList(boardId).then((re) => re)
  );

  return {
    currentBoard: data,
    isLoading,
  };
};

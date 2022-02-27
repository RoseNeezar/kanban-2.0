import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

import { combineEpics, Epic } from "redux-observable";
import { catchError, EMPTY, filter, map, of, switchMap, tap } from "rxjs";
import agent from "../../../api/agent";
import { errorCatcher } from "../error/error.slice";
import {
  addBoard,
  createBoard,
  deleteBoard,
  fetchBoards,
  getBoard,
  getBoardSuccess,
} from "./kanban.slice";

export type MyEpic = Epic<AnyAction, AnyAction, RootState>;

const createBoardEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    filter(createBoard.match),
    switchMap((action) =>
      agent.boardService
        .createBoard({
          boardTitle: action.payload.title,
        })
        .pipe(
          map(({ response }) => addBoard(response)),
          catchError((err) => of(errorCatcher(err.response)))
        )
    )
  );

const fetchBoardEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    filter(fetchBoards.match),
    switchMap((action) =>
      agent.boardService.getAllBoards().pipe(
        map(({ response }) => addBoard(response)),
        catchError((err) => of(errorCatcher(err.response)))
      )
    )
  );

const getBoardEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    filter(getBoard.match),
    switchMap((action) =>
      agent.boardService.getBoard(action.payload.id).pipe(
        map(({ response }) => getBoardSuccess(response)),
        catchError((err) => of(errorCatcher(err.response)))
      )
    )
  );

const deleteBoardEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    filter(deleteBoard.match),
    switchMap((action) =>
      agent.boardService
        .deleteBoard(action.payload.boardId)
        .pipe(map((res) => fetchBoards()))
    )
  );

export default combineEpics(
  createBoardEpic,
  fetchBoardEpic,
  deleteBoardEpic,
  getBoardEpic
);

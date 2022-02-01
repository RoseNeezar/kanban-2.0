import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

import { combineEpics, Epic } from "redux-observable";
import { catchError, filter, map, of, switchMap } from "rxjs";
import agent from "../../../api/agent";
import { errorCatcher } from "../error/error.slice";
import { addBoard, createBoard, fetchBoards } from "./kanban.slice";

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

export default combineEpics(createBoardEpic, fetchBoardEpic);

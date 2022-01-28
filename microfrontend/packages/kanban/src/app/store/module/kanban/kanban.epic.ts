import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { combineEpics, Epic } from "redux-observable";
import {
  catchError,
  concatMap,
  debounceTime,
  filter,
  ignoreElements,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import agent from "../../../api/agent";

export type MyEpic = Epic<AnyAction, AnyAction, RootState>;

const createBoardEpic: MyEpic = (action$, state$) =>
  action$
    .pipe
    // filter(getUserProfile.match),
    // switchMap((action) =>
    //   agent.UserService.getUserByUsername(action.payload).pipe(
    //     map(({ response }) => setUserProfile(response)),
    //     catchError((err) => {
    //       return of(errorCatcher(err.response)).pipe(
    //         tap(() => Navigate?.push("/home"))
    //       );
    //     })
    //   )
    ();

export default combineEpics(createBoardEpic);

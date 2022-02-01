import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { catchError } from "rxjs/operators";
import errorSlice from "./module/error/error.slice";
import kanbanEpic from "./module/kanban/kanban.epic";
import kanbanSlice from "./module/kanban/kanban.slice";

export type MyEpic = Epic<AnyAction, AnyAction, RootState>;

export const reducer = combineReducers({
  kanban: kanbanSlice,
  error: errorSlice,
});

export type ReducerState = ReturnType<typeof reducer>;

const epicMiddleware = createEpicMiddleware<
  AnyAction,
  AnyAction,
  ReducerState
>();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(epicMiddleware),
});

const epics = combineEpics(kanbanEpic);

const rootEpic: MyEpic = (action$, store$, dependencies) =>
  combineEpics(epics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      return source;
    })
  );

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

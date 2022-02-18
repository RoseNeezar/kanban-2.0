import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface kanbanState {
  boards: any[];
  socketConnected: boolean;
}

const initialState: kanbanState = {
  boards: [],
  socketConnected: false,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    fetchBoards: (state) => {},
    createBoard: (state, action: PayloadAction<{ title: string }>) => {},
    deleteBoard: (state, action: PayloadAction<{ boardId: string }>) => {},
    addBoard: (state, action: PayloadAction<any>) => {
      if (action.payload.boards.length > 0) {
        state.boards = action.payload.boards;
        return;
      }
      state.boards.push(action.payload.boards);
    },
    setSocketLoaded: (state) => {
      console.log("setSocketLoaded");
      state.socketConnected = true;
    },
  },
});

export const {
  fetchBoards,
  createBoard,
  addBoard,
  deleteBoard,
  setSocketLoaded,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;

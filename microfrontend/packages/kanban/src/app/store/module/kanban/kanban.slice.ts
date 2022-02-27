import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface kanbanState {
  boards: any[];
  socketConnected: boolean;
  currentBoard: any;
}

const initialState: kanbanState = {
  boards: [],
  socketConnected: false,
  currentBoard: null,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    fetchBoards: (state) => {},
    getBoard: (state, action: PayloadAction<{ id: string }>) => {},
    getBoardSuccess: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.currentBoard = action.payload;
    },
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
  getBoard,
  getBoardSuccess,
  fetchBoards,
  createBoard,
  addBoard,
  deleteBoard,
  setSocketLoaded,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;

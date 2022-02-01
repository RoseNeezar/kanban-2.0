import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface kanbanState {
  boards: any[];
}

const initialState: kanbanState = {
  boards: [],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    fetchBoards: (state) => {},
    createBoard: (state, action: PayloadAction<{ title: string }>) => {},
    addBoard: (state, action: PayloadAction<any>) => {
      console.log("slice", action.payload.boards);
      state.boards = action.payload.boards;
    },
  },
});

export const { fetchBoards, createBoard, addBoard } = kanbanSlice.actions;

export default kanbanSlice.reducer;

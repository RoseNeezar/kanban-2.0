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
    createBoard: (state, action: PayloadAction<any>) => {
      state.boards = action.payload;
    },
  },
});

export const { createBoard } = kanbanSlice.actions;

export default kanbanSlice.reducer;

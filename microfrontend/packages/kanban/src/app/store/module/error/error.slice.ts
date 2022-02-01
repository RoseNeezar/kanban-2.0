import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "@store/types/error.types";
import { toast } from "react-toastify";

export interface errorState {
  boards: any[];
}

const initialState: errorState = {
  boards: [],
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    errorCatcher: (state, action: PayloadAction<IError>) => {
      if (!!action.payload?.errors && action.payload?.errors.length > 0) {
        if (
          action.payload.errors[0].message === "not authenticated" &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/";
        }
        action.payload.errors.map((err) => {
          toast.error(err.message);
        });
      }
    },
  },
});

export const { errorCatcher } = errorSlice.actions;

export default errorSlice.reducer;

import { toast } from "react-toastify";
import create from "zustand";
import { useHistory } from "../../bootstrap";
import agent from "../api/agent";
import { IAuth } from "./types/auth.types";
import { combineAndImmer } from "./types/combine-Immer";

export const useAuthStore = create(
  combineAndImmer(
    {
      task: false,
    },
    (set, get) => ({
      login: async (_: IAuth) => {
        try {
          // const result = await agent.Auth.login(data)
          const result = {
            accessToken: "test-token",
          };
          set((s) => {
            s.task = true;
          });
          get().task;
        } catch (error) {}
      },
    })
  )
);

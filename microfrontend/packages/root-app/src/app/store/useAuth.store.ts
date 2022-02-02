import agent from "@api/agent";
import { useNavigate } from "react-router-dom";
import { useHistory } from "../../bootstrap";
import create from "zustand";
import { ILogin, IRegister } from "./types/auth.types";
import { combineAndImmer } from "./types/combine-Immer";

export const useAuthStore = create(
  combineAndImmer(
    {
      user: null as any | null,
    },
    (set, get) => ({
      login: async (data: ILogin) => {
        try {
          const result = await agent.Auth.login(data);
          set((s) => {
            s.user = result;
          });
          useHistory.go(-1);
        } catch (error) {
          console.log(error);
        }
      },
      register: async (data: IRegister) => {
        try {
          const result = await agent.Auth.signup(data);
          set((s) => {
            s.user = result;
          });
          useHistory.go(-1);
        } catch (error) {
          console.log(error);
        }
      },
      getMe: async () => {
        try {
          const result = await agent.Auth.getMe();
          set((s) => {
            s.user = result;
          });
        } catch (error) {
          useHistory.push("/landing");
        }
      },
      logout: async () => {
        try {
          await agent.Auth.logout();

          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },
    })
  )
);

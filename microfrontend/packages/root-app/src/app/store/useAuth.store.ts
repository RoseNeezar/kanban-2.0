import { toast } from "react-toastify";
import create from "zustand";
import { useHistory } from "../../bootstrap";
import agent from "../api/agent";
import { IAuth } from "./types/auth.types";
import { combineAndImmer } from "./types/combine-Immer";

export const useAuthStore = create(
  combineAndImmer(
    {
      token: window.localStorage.getItem("token") ?? (null as string | null),
      appLoaded: false,
      isLoading: false,
      sidebarStatus: true,
    },
    (set, get) => ({
      showSidebar: async (data: boolean) => {
        set((s) => {
          s.sidebarStatus = data;
        });
      },
    })
  )
);

import type { User } from "@shared/interfaces/user";
import { create } from "zustand";

interface SetSessionParams {
  user: User;
  token: string;
  refreshToken: string;
}

interface UpdateTokensParams {
  token: string;
  refreshToken: string;
}

export interface UserStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;

  setSession: (sessionData: SetSessionParams) => void;
  logout: () => void;
  updateTokens: (updateTokensData: UpdateTokensParams) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  refreshToken: null,

  logout: () => {},
  setSession: (sessionData) => set({ ...sessionData }),
  updateTokens: (updateTokensData) => set({ ...updateTokensData }),
}));

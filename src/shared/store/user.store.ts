import type { User } from '@shared/interfaces/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SetSessionParams {
  user: User;
  token: string;
  refreshToken: string;
}

interface UpdateTokensParams {
  token: string;
  refreshToken: string;
}

interface UserStates {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

interface UserActions {
  setSession: (sessionData: SetSessionParams) => void;
  logout: () => void;
  updateTokens: (updateTokensData: UpdateTokensParams) => void;
  updateUser: (updatedUserData: Partial<User>) => void; // Partial<> -> Torna todos os campos da tipagem opcionais
}

export type UserStore = UserActions & UserStates;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,

      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
        }),
      setSession: (sessionData) => set({ ...sessionData }),
      updateTokens: (updateTokensData) => set({ ...updateTokensData }),
      updateUser: (updatedUserData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUserData } : null,
        })),
    }),
    {
      name: 'marketplace-auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

import create from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../__typescript/api";

export type AuthData = Pick<User, "firstName" | "lastName"> & {
  token: string;
};

export type Auth = {
  [P in keyof AuthData]: string | null;
};

export type AuthState = Auth & {
  logout: () => void;
  login: ({ token, firstName, lastName }: AuthData) => void;
  update: ({ firstName, lastName }: Omit<AuthData, "token">) => void;
};

export const initialState = {
  token: null,
  firstName: null,
  lastName: null,
};

export const useAuth = create(
  persist<AuthState>(
    (set, get) => ({
      ...initialState,
      login: (data) => {
        set({ ...data });
      },
      update: ({ firstName, lastName }) => {
        set({ firstName, lastName });
      },
      logout: () => {
        set(initialState);
      },
    }),
    {
      name: "@auth",
      version: 0,
    }
  )
);

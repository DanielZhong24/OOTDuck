/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";
import { type Session } from "@supabase/supabase-js";

export type AuthContextType = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  handleLogin: (email: string, password: string) => Promise<any>;
  handleLogout: () => Promise<any>;
  handleSignup: (email: string, password: string, fullName: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  loading?: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  setSession: () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  handleSignup: async () => {},
  signInWithGoogle: async () => {},
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

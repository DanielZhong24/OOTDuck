import { createContext, useContext } from "react";

export type AuthContextType = {
  session: string | null;
  setSession: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  setSession: () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

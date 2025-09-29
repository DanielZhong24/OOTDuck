import { useState, useEffect } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthContextType["session"]>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

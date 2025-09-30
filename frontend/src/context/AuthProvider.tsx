/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { supabase } from "./supabaseClient";
import { useNavigate, type NavigateFunction } from "react-router-dom";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthContextType["session"]>(null);
  const navigate: NavigateFunction = useNavigate();

  console.log("Current session:", session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignup: (email: string, password: string) => Promise<any> = async (
    email: string,
    password: string,
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/",
      },
    });
    if (error) {
      console.error("Error signing up:", error.name);
      return { pass: false, error: error.name };
    }

    return { pass: true, data };
  };

  const handleLogin: (email: string, password: string) => Promise<any> = async (
    email: string,
    password: string,
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      return { pass: false, error: error.name };
    }

    return { pass: true, data };
  };

  const handleLogout: () => Promise<any> = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.name);
      return { pass: false, error: error.name };
    }

    return { pass: true };
  };

  if (!session) {
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{ session, setSession, handleSignup, handleLogout, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

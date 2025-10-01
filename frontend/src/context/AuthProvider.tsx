/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { supabase } from "./supabaseClient";
import { useNavigate, type NavigateFunction } from "react-router-dom";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthContextType["session"]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        setSession(null);
        setLoading(false);
      } else {
        setSession(session);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignup: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<any> = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: fullName,
        },
        emailRedirectTo: "http://localhost:5173/",
      },
    });
    if (error) {
      return { pass: false, error: error.message };
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
      return { pass: false, error: error.message };
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
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
      return { pass: false, error: error.message };
    }

    return { pass: true };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        handleSignup,
        handleLogout,
        handleLogin,
        signInWithGoogle,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

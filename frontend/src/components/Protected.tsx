import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, type NavigateFunction } from "react-router-dom";

function Protected({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login");
    }
  }, [session, loading, navigate]);

  if (loading || session === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg sm:text-xl lg:text-2xl">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default Protected;

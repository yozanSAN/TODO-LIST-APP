import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../helper/supabaseClient";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the location they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
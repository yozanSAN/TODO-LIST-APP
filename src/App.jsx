import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import { useEffect, useState } from "react";
import { supabase } from "./helper/supabaseClient.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for existing session on app load
      const { data: { session } } = await supabase.auth.getSession();
      
      // Only redirect if user is on the root path
      if (session) {
        const currentPath = window.location.pathname;
        if (currentPath === '/') {
          navigate('/home');
        }
        // Don't redirect if they're on /login or /register - let them navigate freely
      }
      
      setIsInitialized(true);
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      
      if (event === 'SIGNED_IN') {
        // Check if there's a stored redirect path
        const redirectPath = localStorage.getItem('authRedirect') || '/home';
        localStorage.removeItem('authRedirect');
        navigate(redirectPath);
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!isInitialized) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../shared/components/context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl sm:text-2xl font-semibold text-gray-700">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

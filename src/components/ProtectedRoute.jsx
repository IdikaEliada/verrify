import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-[#e8e0d0] text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === "courserep" ? "/courserep" : "/dashboard"} replace />;
  }

  return children;
}
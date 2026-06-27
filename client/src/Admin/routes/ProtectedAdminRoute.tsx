import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdminLoggedIn = localStorage.getItem("admin") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;

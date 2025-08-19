import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

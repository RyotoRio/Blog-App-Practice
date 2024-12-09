import { Navigate, Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import { useAuth } from "../context/AuthContext";

const PublicLayout = () => {
  const auth = useAuth;

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
};

export default PublicLayout;

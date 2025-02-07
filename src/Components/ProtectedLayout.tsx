import { useSession } from "@supabase/auth-helpers-react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const ProtectedLayout = () => {
  const session = useSession();

  if (!session) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;

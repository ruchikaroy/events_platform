import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import AdminEventList from "./AdminEventList";
import GeneralUserEventList from "./GeneralUserEventList";

const EventsList = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session) {
      checkAdminStatus(session.user.email);
    }
  }, [session]);

  const checkAdminStatus = (email: any) => {
    const adminEmail = "roymanagement369@gmail.com";
    setIsAdmin(adminEmail.includes(email));
  };

  return <>{isAdmin ? <AdminEventList /> : <GeneralUserEventList />}</>;
};

export default EventsList;

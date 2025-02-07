import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import AdminEventList from "./AdminEventList";
import GeneralUserEventList from "./GeneralUserEventList";

const EventsList = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = (email: any) => {
      const adminEmail = "roymanagement369@gmail.com";
      setIsAdmin(adminEmail.includes(email));
    };

    if (session) {
      checkAdminStatus(session.user.email);
    }
  }, [session]);

  return <>{isAdmin ? <AdminEventList /> : <GeneralUserEventList />}</>;
};

export default EventsList;

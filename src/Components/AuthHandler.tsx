import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const AuthHandler = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const processLogin = async () => {
      // Extract session data from URL hash fragment
      await supabase.auth.getSession(); // Ensures Supabase processes the OAuth session

      if (session) {
        const userEmail = session.user.email;
        if (userEmail === "roymanagement369@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/eventslist");
        }
      }
    };

    processLogin();
  }, [session, navigate, supabase]);

  return <p>Processing login...</p>;
};

export default AuthHandler;

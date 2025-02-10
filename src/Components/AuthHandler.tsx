import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const AuthHandler = () => {
  //   const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const processLogin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        navigate("/");
        return;
      }

      if (data?.session) {
        const userEmail = data.session.user.email;
        if (userEmail === "roymanagement369@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/eventslist");
        }
      } else {
        console.log("No active session found.");
        navigate("/");
      }
    };

    processLogin();
  }, [navigate, supabase]);

  return <p>Processing login...</p>;
};

export default AuthHandler;

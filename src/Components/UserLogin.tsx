import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../supabase";
import { Session } from "@supabase/supabase-js";

const UserLogin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      navigate("/eventslist");
    } else {
      setCheckingSession(false);
    }
  }, [session, navigate]);

  if (checkingSession) {
    return null;
  }

  if (!session) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: "400px" }}>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                container: {
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                },
                button: {
                  width: "100%",
                  backgroundColor: "#beb5ef",
                  color: "#486570",
                  border: "none",
                },
              },
            }}
            providers={["google"]}
            socialLayout="vertical"
          />
        </div>
      </div>
    );
  } else {
    return <div>Logged in!</div>;
  }
};

export default UserLogin;

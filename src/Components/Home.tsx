import { useNavigate } from "react-router-dom";
import ImageToAdd from "../assets/Blue Pink Playful Weekly Newsletter Email Header.png";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const Home = () => {
  const session = useSession(); //tokens saved here in the session. When session exists, we have a user
  const supabase = useSupabaseClient(); //talk to supabase
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (session) {
      const checkAdminLogin = (email: any) => {
        const adminEmail = "roymanagement369@gmail.com";
        if (adminEmail.includes(email)) {
          navigate("/admin");
        } else {
          navigate("/eventslist");
        }
      };
      checkAdminLogin(session.user.email);
    } else {
      setCheckingSession(false);
    }
  }, [session, navigate]);

  const googleSignin = () => {
    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar",
          // redirectTo: window.location.href,
        },
      })
      .then((data) => {
        console.log("Logged in successfully", data);
      })
      .catch((error) => {
        alert("Error logging in to Google provider with Supabase");
        console.log(error);
      });
  };
  if (checkingSession) {
    return null;
  }

  return (
    <>
      {!session && (
        <>
          <img src={ImageToAdd} alt="Banner Image" />
          <div>
            <button
              onClick={googleSignin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign In as User
            </button>
            <button
              onClick={googleSignin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign In as Admin
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

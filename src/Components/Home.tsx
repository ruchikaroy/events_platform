import { useNavigate } from "react-router";
import ImageToAdd from "../assets/Blue Pink Playful Weekly Newsletter Email Header.png";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const Home = () => {
  const session = useSession(); //tokens saved here in the session. When session exists, we have a user
  const supabase = useSupabaseClient(); //talk to supabase
  const navigate = useNavigate();
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  useEffect(() => {
    if (session) {
      checkAdminLogin(session.user.email);
    }
  }, [session, navigate]);

  const checkAdminLogin = async (email: any) => {
    const adminEmail = "roymanagement369@gmail.com";

    if (email && adminEmail.includes(email)) {
      navigate("/admin");
    } else {
      navigate("/eventslist");
    }
  };

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

  return (
    <>
      <img src={ImageToAdd} />
      {!session && (
        <div>
          <button
            onClick={() => {
              setIsAdminLogin(false);
              googleSignin();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Sign In as User
          </button>
          <button
            onClick={() => {
              setIsAdminLogin(true);
              googleSignin();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Sign In as Admin
          </button>
        </div>
      )}
    </>
  );
};

export default Home;

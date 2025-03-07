import { useNavigate } from "react-router-dom";
import ImageToAdd from "../assets/Teal Lilac Neon Green 1.png";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const session = useSession(); //tokens saved here in the session. When session exists, we have a user
  const supabase = useSupabaseClient(); //talk to supabase
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);

  const userLogin = () => {
    console.log("user login");
    navigate(`/user`); // remove this implementation if new feature doesnt work
  };

  // useEffect(() => {
  //   if (session) {
  //     navigate("/eventslist");
  //   } else {
  //     setCheckingSession(false);
  //   }
  // }, [session, navigate]);

  useEffect(() => {
    if (checkingSession && session) {
      navigate("/eventslist");
    }
    setCheckingSession(false);
  }, [session, navigate, checkingSession]);

  const googleSignin = (isAdmin: boolean) => {
    if (isAdmin) {
      localStorage.setItem("adminLogin", "true");
    }
    // else {
    //   localStorage.removeItem("adminLogin");

    // } // uncomment this if feature doesnt work

    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            "https://pcstcetyssfvownxovbt.supabase.co/auth/v1/callback",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })
      .then((data) => {
        console.log("Logged in successfully", data);
        if (isAdmin) {
          navigate("/eventslist"); // Redirect Admin
        } else {
          navigate("/user"); // Redirect Regular User
        }
      })
      .catch((error) => {
        toast.error("Error logging in to Google provider with Supabase");
        console.log(error);
      });
  };
  if (checkingSession) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[90vh]">
        {!session && (
          <>
            <h1
              style={{ fontSize: "40px", color: "#f4f4f4" }}
              className=" block py-1.5 font-thin"
            >
              COMMUNITY EVENTS 2025
            </h1>
            <img
              style={{ width: "500px", placeItems: "center" }}
              src={ImageToAdd}
              alt="Banner Image"
            />
            <div className="flex gap-3">
              <button
                style={{
                  backgroundColor: "#beb5ef",
                  color: "#486570",
                  fontSize: "20px",
                }}
                onClick={userLogin}
                // onClick={() => googleSignin(false)} // uncomment this out if new feature doesnt work
                className="  px-4 py-2 rounded-md font-medium"
              >
                User Login
              </button>
              <button
                style={{
                  backgroundColor: "#beb5ef",
                  color: "#486570",
                  fontSize: "20px",
                }}
                onClick={() => googleSignin(true)}
                className=" px-4 py-2 rounded-md font-medium"
              >
                Admin Login
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

import { useNavigate } from "react-router-dom";
import ImageToAdd from "../assets/Teal Lilac Neon Green 1.png";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../supabase";

const Home = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);

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

  return (
    <>
      <div className="flex flex-col items-center px-4">
        <h1 className="text-5xl font-thin text-white text-center mt-20">
          COMMUNITY EVENTS 2025
        </h1>
        <div className="grid grid-cols-1 items-center justify-center p-8 mt-5 gap-x-0 md:grid-cols-3 sm:grid-cols-1  ">
          <div className="flex justify-center">
            <img
              // className="w-[90%] md:max-w-md sm:max-w-sm mx-auto"
              className="w-[90%] sm:w-[90%] md:w-[100%] max-w-sm md:max-w-lg mx-auto"
              src={ImageToAdd}
              alt="Banner Image"
            />
          </div>
          <div className="hidden md:block h-4/5 w-[1px] bg-white mx-auto"></div>
          <div className="flex flex-col items-center">
            {!session ? (
              <div className="w-[90%] sm:w-[90%] md:w-[100%] max-w-sm md:max-w-md  bg-white p-6 rounded-lg shadow-md">
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  providers={["google"]}
                  socialLayout="vertical"
                />
              </div>
            ) : (
              <div className="text-white">Logged in!</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

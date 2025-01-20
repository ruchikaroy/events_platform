import { useNavigate } from "react-router";
import ImageToAdd from "./assets/Blue Pink Playful Weekly Newsletter Email Header.png";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

const Home = () => {
  const session = useSession(); //tokens saved here in the session. When session exists, we have a user
  const supabase = useSupabaseClient(); //talk to supabase

  const navigate = useNavigate();

  const googleSignin = () => {
    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar",
          //   redirectTo: window.location.href,
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
      {session ? (
        <>{navigate("/eventslist")}</>
      ) : (
        <>
          <button onClick={() => googleSignin()}>Sign In With Google</button>
        </>
      )}
    </>
  );
};

export default Home;

import ImageToAdd from "../assets/Blue Pink Playful Weekly Newsletter Email Header.png";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Home = () => {
  const supabase = useSupabaseClient(); //talk to supabase

  const googleSignin = () => {
    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar",
          redirectTo: "https://localhost:5174/eventslist", //to save the user session on this page upon rendering
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
      <button onClick={() => googleSignin()}>Sign In With Google</button>
    </>
  );
};

export default Home;

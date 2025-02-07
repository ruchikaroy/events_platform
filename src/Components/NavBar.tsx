import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "../assets/Community Logo (2).png";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import {
  faUser,
  faRightFromBracket,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const session = useSession(); //tokens saved here in the session. When session exists, we have a user
  const supabase = useSupabaseClient(); //talk to supabase
  const navigate = useNavigate();
  const { isLoading } = useSessionContext(); //to avoid flickering when refereshing

  const googleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  console.log(session);
  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <nav
        style={{ backgroundColor: "#f4f4f4" }}
        className="block max-w-screen px-3 py-1  shadow-md rounded-md lg:px-8 lg:py-3 mx-2"
      >
        <div
          style={{ color: "#486570" }}
          className="container flex flex-wrap items-center justify-between px-0 h-20"
        >
          <img src={logoImage} alt="Community Events 2025" className="logo" />
          <h1
            style={{ fontSize: "40px", marginLeft: "-600px" }}
            className=" block py-1.5 text-black font-thin"
          >
            COMMUNITY EVENTS
          </h1>

          <div className="hidden lg:flex">
            {session ? (
              <ul className="flex flex-col gap-2 mt-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 space-x-0 font-light text-lg ">
                <li className="flex items-center p-1 gap-x-2">
                  <FontAwesomeIcon icon={faUser} style={{ color: "#486570" }} />
                  <p
                    className="text-black"
                    style={{ marginTop: "20px", marginRight: "10px" }}
                  >
                    Logged in email: {session?.user.email}
                  </p>
                </li>
                <li
                  style={{ marginRight: "10px" }}
                  className="flex items-center p-1 text-md gap-x-2 text-black  "
                >
                  <FontAwesomeIcon
                    style={{ color: "#486570" }}
                    icon={faRightFromBracket}
                  />
                  <button onClick={() => googleSignOut()}>Sign Out</button>
                </li>
                <li
                  style={{ marginRight: "-250px" }}
                  className="flex items-center p-1 text-md gap-x-2"
                >
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    style={{ color: "#486570" }}
                  />
                  <button>
                    <Link
                      className="text-black"
                      style={{
                        textDecoration: "none",
                      }}
                      to={"/eventslist"}
                    >
                      Events
                    </Link>
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

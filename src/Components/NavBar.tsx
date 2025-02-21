import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import logoImage from "../assets/Community Logo (2).png";
import { useState } from "react";
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
import Hamburger from "hamburger-react";

const NavBar = () => {
  const session = useSession(); //tokens saved here in the session. When session exists, we have a user
  const supabase = useSupabaseClient(); //talk to supabase
  const navigate = useNavigate();
  const { isLoading } = useSessionContext(); //to avoid flickering when refereshing
  const [menuOpen, setMenuOpen] = useState(false);

  const googleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <nav
        style={{ backgroundColor: "#f4f4f4" }}
        className="shadow-md py-3 px-4 lg:px-8 rounded-md"
      >
        <div
          style={{ color: "#486570" }}
          className="container mx-auto flex items-center justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <h1 className=" text-xl sm:text-lg lg:text-3xl text-black font-light">
              COMMUNITY EVENTS
            </h1>

            <div className="lg:hidden text-black font-thin focus:outline-none">
              <Hamburger toggled={menuOpen} toggle={setMenuOpen} />
            </div>
            <div
              className={`lg:flex lg:items-center lg:space-x-6 ${
                menuOpen ? "block" : "hidden"
              } lg:w-auto mt-4 lg:mt-0`}
            >
              {session ? (
                <ul className="flex flex-col lg:flex-row lg:space-x-6  ">
                  <li className="flex items-center gap-x-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#486570" }}
                    />
                    <p className="text-black m-0">
                      Logged in email: {session?.user.email}
                    </p>
                  </li>
                  <li className="flex items-center p-1 gap-x-2 text-black  ">
                    <FontAwesomeIcon
                      style={{ color: "#486570" }}
                      icon={faRightFromBracket}
                    />
                    <button onClick={() => googleSignOut()}>Sign Out</button>
                  </li>
                  {!localStorage.getItem("adminLogin") && (
                    <li className="flex items-center p-1 gap-x-2">
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
                  )}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

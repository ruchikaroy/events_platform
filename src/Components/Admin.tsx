import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = () => {
  // const session = useSession();
  const navigate = useNavigate();
  // console.log(session);
  const [userId, setUserid] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [inputUserEmail, setInputUserEmail] = useState<string>("");
  const [inputUserId, setInputUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      axios
        .get(
          `https://www.eventbriteapi.com/v3/users/me/?token=${
            import.meta.env.VITE_EB_ADMIN_TOKEN
          }`
        )
        .then((response: any) => {
          const eventBriteAccountUseriD = response.data.id;
          const eventBriteUserEmail = response.data.emails[0].email;
          setUserid(eventBriteAccountUseriD);
          setUserEmail(eventBriteUserEmail);

          if (userId === inputUserId && userEmail === inputUserEmail) {
            navigate("/eventslist");
            toast.success("Access to Admin content permitted.");
          } else {
            toast.error("Invalid User Email/ User Id! ");
            setInputUserEmail("");
            setInputUserId("");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Verification failed.");
    }

    // if (isLoading || userId === null || userEmail === null) {
    //   toast.error("Please enter admin email and user id.");
    // }
    // if (userId === inputUserId && userEmail === inputUserEmail) {
    //   navigate("/eventslist");
    //   toast.success("Access to Admin content permitted.");
    // } else {
    //   toast.error("Invalid User Email/ User Id! ");
    //   setInputUserEmail(""), setInputUserId("");
    // }
  };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://www.eventbriteapi.com/v3/users/me/?token=${
  //         import.meta.env.VITE_EB_ADMIN_TOKEN
  //       }`
  //     )
  //     .then((response: any) => {
  //       const eventBriteAccountUseriD = response.data.id;
  //       const eventBriteUserEmail = response.data.emails[0].email;
  //       setUserid(eventBriteAccountUseriD);
  //       setUserEmail(eventBriteUserEmail);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex items-center justify-center">
          <h1 style={{ color: "#f4f4f4" }}>Enter Admin Details</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            style={{ backgroundColor: "#f4f4f4", height: "300px" }}
            className="relative flex flex-col items-start justify-center px-10 rounded-lg"
          >
            <label>Email</label>
            <input
              className="bg-lime-200 h-10 rounded-md"
              style={{ width: "500px", outlineColor: "#beb5ef" }}
              type="text"
              value={inputUserEmail}
              onChange={(event) => setInputUserEmail(event.target.value)}
              required
            />
            <label>User id</label>
            <input
              className="bg-lime-200 h-10 rounded-md"
              style={{ width: "500px", outlineColor: "#beb5ef" }}
              type="text"
              value={inputUserId}
              required
              onChange={(e) => {
                setInputUserId(e.target.value);
              }}
            />
            <div className="mt-3 flex flex-col items-center justify-items-center w-full">
              <button
                className="rounded-md bg-violet-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-violet-700 focus:shadow-none active:bg-violet-700 hover:bg-violet-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                {isLoading ? "Verifying..." : "Submit"}
                {/* Submit */}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;

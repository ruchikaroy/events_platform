import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = () => {
  // const session = useSession();
  const navigate = useNavigate();
  // console.log(session);
  const [userId, setUserid] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [inputUserEmail, setInputUserEmail] = useState<string>("");
  const [inputUserId, setInputUserId] = useState<string>("");

  useEffect(() => {
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
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId === inputUserId && userEmail === inputUserEmail) {
      navigate("/eventslist");
      toast.success("Access to Admin content permitted.");
    } else {
      toast.error("Invalid User Email/ User Id! ");
      setInputUserEmail(""), setInputUserId("");
    }
  };

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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;

import { useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const session = useSession();
  const navigate = useNavigate();
  console.log(session);
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
        console.log(response.data);
        const eventBriteAccountUseriD = response.data.id;
        const eventBriteUserEmail = response.data.emails[0].email;
        setUserid(eventBriteAccountUseriD);
        setUserEmail(eventBriteUserEmail);
        console.log(eventBriteAccountUseriD);
        console.log(eventBriteUserEmail);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId === inputUserId && userEmail === inputUserEmail) {
      navigate("/eventslist");
      alert("Access to Admin content permitted.");
    } else {
      alert("Invalid User Email/ User Id, ");
      setInputUserEmail(""), setInputUserId("");
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "200px",
          }}
          onSubmit={handleSubmit}
        >
          <label>Email</label>
          <input
            style={{ background: "yellow", width: "500px" }}
            type="text"
            value={inputUserEmail}
            onChange={(event) => setInputUserEmail(event.target.value)}
            required
          />
          <label>User id</label>
          <input
            style={{ background: "yellow", width: "500px" }}
            type="text"
            value={inputUserId}
            required
            onChange={(e) => {
              setInputUserId(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Admin;

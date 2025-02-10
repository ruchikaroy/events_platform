import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./Components/EventDetail";
import Admin from "./Components/Admin";
import EventsList from "./Components/EventsList";
import CreateEventForm from "./Components/CreateEventForm";
import ProtectedLayout from "./Components/ProtectedLayout";
import AuthHandler from "./Components/AuthHandler";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      navigate("/eventslist");
    }
  }, [navigate]);
  return (
    <>
      <div
        className="min-h-screen"
        style={{ backgroundColor: "#486570", backgroundSize: "100%" }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/eventslist" element={<EventsList />}></Route>
            <Route path="/auth/callback" element={<AuthHandler />}></Route>
            <Route path="/eventdetails" element={<EventDetail />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/eventform" element={<CreateEventForm />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

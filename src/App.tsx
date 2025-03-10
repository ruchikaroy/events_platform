import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./Components/EventDetail";
import EventsList from "./Components/EventsList";
import CreateEventForm from "./Components/CreateEventForm";
import ProtectedLayout from "./Components/ProtectedLayout";
import UserLogin from "./Components/UserLogin";

function App() {
  return (
    <>
      <div
        className="min-h-screen"
        style={{ backgroundColor: "#486570", backgroundSize: "100%" }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user" element={<UserLogin />}></Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/eventslist" element={<EventsList />}></Route>
            <Route path="/eventdetails" element={<EventDetail />}></Route>

            <Route path="/eventform" element={<CreateEventForm />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

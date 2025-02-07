import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./Components/EventDetail";
import Admin from "./Components/Admin";
import NavBar from "./Components/NavBar";
import EventsList from "./Components/EventsList";
import CreateEventForm from "./Components/CreateEventForm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/eventslist" element={<EventsList />}></Route>
        <Route path="/eventdetails" element={<EventDetail />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/eventform" element={<CreateEventForm />}></Route>
      </Routes>
    </>
  );
}

export default App;

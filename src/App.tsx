import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import EventList from "./Components/EventList";
import EventDetail from "./Components/EventDetail";
import Admin from "./Components/Admin";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/eventslist" element={<EventList />}></Route>
        <Route path="/eventdetails" element={<EventDetail />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </>
  );
}

export default App;

import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Events_List from "./Components/Events_List";

// interface AxiosResponse {
//   events: Event[];
// }

function App() {
  // const [events, setEvents] = useState<Event[]>([]);
  // const token = import.meta.env.VITE_EB_TOKEN;
  // const organizationId = import.meta.env.VITE_EB_ORGANIZATION_ID;

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await axios.get<AxiosResponse>(
  //         `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/?token=${token}`,
  //         {
  //           params: {
  //             status: "live",
  //           },
  //         }
  //       );
  //       console.log("API Response:", response.data);
  //       const modifiedEventsWithSameLogo = response.data.events.map(
  //         (event: Event) => ({
  //           ...event,
  //           logo: event.logo || {
  //             original: {
  //               url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F928469323%2F2563665001651%2F1%2Foriginal.png?auto=format%2Ccompress&q=75&sharp=10&s=fbc158eed52e2bebb6f5520ddd906c32",
  //             },
  //           },
  //         })
  //       );
  //       setEvents(modifiedEventsWithSameLogo);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/eventslist" element={<Events_List />}></Route>
      </Routes>
    </>
  );
}

export default App;

import Event from "../../Types/eventDataTypes";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";

// interface Props {
//   eventObj: Event[];
// }
interface AxiosResponse {
  events: Event[];
}

const Events_List = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const token = import.meta.env.VITE_EB_TOKEN;
  const organizationId = import.meta.env.VITE_EB_ORGANIZATION_ID;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<AxiosResponse>(
          `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/?token=${token}`,
          {
            params: {
              status: "live",
            },
          }
        );
        console.log("API Response:", response.data);
        const modifiedEventsWithSameLogo = response.data.events.map(
          (event: Event) => ({
            ...event,
            logo: event.logo || {
              original: {
                url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F928469323%2F2563665001651%2F1%2Foriginal.png?auto=format%2Ccompress&q=75&sharp=10&s=fbc158eed52e2bebb6f5520ddd906c32",
              },
            },
          })
        );
        setEvents(modifiedEventsWithSameLogo);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    {
      events.forEach((event) => {
        const exampleCallback = function () {
          console.log("Order complete!");
        };
        (window as any).EBWidgets.createWidget({
          widgetType: "checkout",
          eventId: event.id,
          modal: true,
          modalTriggerElementId: `eventbrite-widget-modal-trigger-${event.id}`,
          onOrderComplete: exampleCallback,
        });
      });
    }
  }, [events]);

  return (
    <>
      <NavBar />

      <ul>
        <div className="grid grid-cols-4 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96"
            >
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <img
                  src={
                    event.logo?.original?.url ||
                    "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F928469323%2F2563665001651%2F1%2Foriginal.png?auto=format%2Ccompress&q=75&sharp=10&s=fbc158eed52e2bebb6f5520ddd906c32"
                  }
                  alt="Event Logo"
                />
              </div>
              <div className="p-4">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                  <li>{event.name.text}</li>
                </h6>
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  <li>{new Date(event.start.local).toDateString()}</li>
                </h5>
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                  <li>
                    Start:{" "}
                    {new Date(event.start.local)
                      .toLocaleTimeString([], {
                        hour12: true,
                      })
                      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                  </li>
                  <li>
                    End:{" "}
                    {new Date(event.end.local)
                      .toLocaleTimeString([], {
                        hour12: true,
                      })
                      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                  </li>
                </h6>

                <p className="text-slate-600 leading-normal font-light">
                  {event.description.text}
                </p>
              </div>
              <div className="px-4 pb-4 pt-0 mt-2">
                <button
                  id={`eventbrite-widget-modal-trigger-${event.id}`}
                  className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </>
  );
};

export default Events_List;

import Event from "../../Types/eventDataTypes";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";

interface Props {
  showActions: boolean;
  isAdmin: boolean;
}

const EventCard = ({ showActions, isAdmin }: Props) => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const token = import.meta.env.VITE_EB_GENERAL_USER_TOKEN;
  const organizationId = import.meta.env.VITE_EB_ORGANIZATION_ID;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
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
            logo: event.logo ||
              event.name.text || {
                logo_id: "928469323",
              },
          })
        );
        setEventData(modifiedEventsWithSameLogo);
        setIsLoading(false);
        setError(error);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    {
      eventData.forEach((event) => {
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
  }, [eventData]);

  const handleButtonClick = (event: Event) => {
    navigate("/eventdetails", { state: { eventObj: event } }); // navigated to eventdetails component with the selected event object as state. passed the event obj with the state
  };
  const handleCreateEventButtonClick = () => {
    navigate("/eventform");
  };

  const handleEventDeleteButton = (event: Event) => {
    axios
      .post(
        `https://www.eventbriteapi.com/v3/events/${event.id}/unpublish/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_EB_ADMIN_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Event Deleted!", response.data);
        alert("Event Deleted");
        setEventData((prevEvents) =>
          prevEvents.filter((e) => e.id !== event.id)
        );
      })
      .catch((error) => {
        console.error(
          "Error in deleting the event",
          error.response?.data || error.message
        );
        alert("Failed to delete event");
      });
  };

  return (
    <>
      <div style={{ margin: "20px" }}>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center mt-4">
            <Spinner animation="border" variant="danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <h2 className="font-bold leading-snug tracking-normal text-red-800 mx-auto my-6 w-full text-2xl lg:max-w-3xl lg:text-4xl">
            Sorry! an error has occurred.
          </h2>
        ) : (
          <ul>
            <div className="grid grid-cols-4 gap-4">
              {eventData.map((event) => (
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
                    <h6
                      style={{ fontSize: "20px" }}
                      className="mb-3 text-slate-800 font-semibold"
                    >
                      <li>{event.name.text}</li>
                    </h6>
                    <h6 className=" text-slate-800 text-sm font-semibold">
                      <li>
                        Date: {new Date(event.start.local).toDateString()}
                      </li>
                      <li>
                        Start Time:{" "}
                        {new Date(event.start.local)
                          .toLocaleTimeString([], {
                            hour12: true,
                          })
                          .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                      </li>
                      <li>
                        End Time:{" "}
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
                  <div className=" flex flex-col px-4 pb-4 pt-0 mt-2 ">
                    {showActions ? (
                      <>
                        <button className="rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-1">
                          Edit
                        </button>
                        <button
                          className="rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          onClick={() => handleEventDeleteButton(event)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          id={`eventbrite-widget-modal-trigger-${event.id}`}
                          className="rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-1"
                          type="button"
                        >
                          Register
                        </button>
                        <button
                          id={event.id}
                          className="rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => handleButtonClick(event)}
                        >
                          Event Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {isAdmin && (
                <div className="flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 h-[420px] justify-center items-center">
                  <h6>
                    <li>
                      <button
                        className="rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleCreateEventButtonClick}
                      >
                        Create Event
                      </button>
                    </li>
                  </h6>
                </div>
              )}
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default EventCard;

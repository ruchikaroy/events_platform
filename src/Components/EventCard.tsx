import axios from "axios";
import Event from "../../Types/eventDataTypes";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface Props {
  showActions: boolean;
  isAdmin: boolean;
}

const EventCard = ({ showActions, isAdmin }: Props) => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const token = import.meta.env.VITE_EB_TOKEN;
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

        const modifiedEventsWithSameLogo = response.data.events.map(
          (event: Event) => ({
            ...event,
            logo: event.logo ||
              event.name.text || {
                logo_id: "956452663",
              },
          })
        );
        console.log(modifiedEventsWithSameLogo);
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

  const formatGoogleCalendarDate = (date: any) => {
    const dateObj = new Date(date);

    return dateObj.toISOString().replace(/[-:]/g, "").split(".")[0];
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
            Authorization: `Bearer ${import.meta.env.VITE_EB_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Event Deleted!", response.data);
        toast.success("Event Deleted");
        setEventData((prevEvents) =>
          prevEvents.filter((e) => e.id !== event.id)
        );
      })
      .catch((error) => {
        console.error(
          "Error in deleting the event",
          error.response?.data || error.message
        );
        toast.error("Failed to delete event");
      });
  };

  return (
    <>
      <div className="m-1">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center mt-4">
            <Spinner animation="border" variant="white" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <h2 className="font-bold leading-snug tracking-normal text-red-800 mx-auto my-6 w-full text-2xl lg:max-w-3xl lg:text-4xl">
            Sorry! an error has occurred.
          </h2>
        ) : (
          <ul className="p-0 m-0">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto w-full max-w-[1200px]">
              {isAdmin && (
                <li className="flex flex-col items-center justify-center  bg-white shadow-md border rounded-lg w-full max-w-[350px] mx-auto p-6 min-h-[550px] transform transition duration-300 hover:scale-105 hover:shadow-xl mt-3">
                  <button
                    className="rounded-md bg-violet-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-violet-700 focus:shadow-none active:bg-violet-700 hover:bg-violet-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    style={{ fontSize: "20px" }}
                    onClick={handleCreateEventButtonClick}
                  >
                    Create Event
                  </button>
                </li>
              )}
              {eventData.map((event) => (
                <div
                  key={event.id}
                  style={{ backgroundColor: "#f4f4f4", minHeight: "550px" }}
                  className="flex flex-col shadow-md rounded-lg w-full max-w-[350px] mt-3 mb-3 mx-auto transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                    <img
                      style={{ minHeight: "250px" }}
                      src={
                        event.logo?.original?.url ||
                        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F956452663%2F2563664921091%2F1%2Foriginal.20250209-172958?auto=format%2Ccompress&q=75&sharp=10&s=a96355c95e68beb4cb490825b82f977a"
                      }
                      alt="Event Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h6
                      style={{ fontSize: "20px", color: "#486570" }}
                      className="mb-3 font-semibold"
                    >
                      <li>{event.name.text}</li>
                    </h6>
                    <h6
                      style={{ color: "#486570" }}
                      className=" text-slate-800 text-sm font-semibold"
                    >
                      <li>
                        Start Time:{" "}
                        {new Date(event.start.local).toLocaleTimeString([], {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </li>
                      <li>
                        End Time:{" "}
                        {new Date(event.end.local).toLocaleTimeString([], {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </li>
                    </h6>

                    <p className="text-slate-600 leading-normal font-light min-h-[50px]">
                      {event.description.text}
                    </p>
                  </div>
                  <div className=" flex flex-col px-4 pb-4 pt-0 mt-auto">
                    {showActions ? (
                      <>
                        <button
                          type="button"
                          className="rounded-md bg-violet-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-violet-700 focus:shadow-none active:bg-violet-700 hover:bg-violet-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          onClick={() => handleEventDeleteButton(event)}
                          style={{ fontSize: "20px" }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          id={`eventbrite-widget-modal-trigger-${event.id}`}
                          className="rounded-md bg-violet-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-violet-700 focus:shadow-none active:bg-violet-700 hover:bg-violet-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-1 font-thin"
                          type="button"
                          style={{ fontSize: "20px" }}
                        >
                          Register
                        </button>
                        <a
                          href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=${
                            event.name.text
                          }&dates=${formatGoogleCalendarDate(
                            event.start.local
                          )}/${formatGoogleCalendarDate(
                            event.end.local
                          )}&details=${event.description.text}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full rounded-md bg-violet-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-violet-700 focus:shadow-none active:bg-violet-700 hover:bg-violet-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-thin no-underline "
                          style={{ fontSize: "20px" }}
                        >
                          Add to calendar
                        </a>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default EventCard;

import Event from "../../Types/eventDataTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "@supabase/auth-helpers-react";
import { CalendarPlus } from "lucide-react";

const EventDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = import.meta.env.VITE_EB_GENERAL_USER_TOKEN;

  const { eventObj } = (location.state as { eventObj: Event }) || {}; // retreive the eventObj from the state property in event detail component using useLocation hook
  // console.log("logging event Object", eventObj);

  const [locationName, setLocationName] = useState({ name: "" });

  const session = useSession();

  useEffect(() => {
    axios
      .get(
        `https://www.eventbriteapi.com/v3/venues/${eventObj.venue_id}/?token=${token}`
      )
      .then((response) => {
        setLocationName(response.data);
      })
      .catch((error: AxiosError) => {
        console.log("Error in fetching the location name", error);
      });
  }, []);

  const creatEventButton = () => {
    const event = {
      summary: eventObj.name.text,
      description: eventObj.description.text,
      start: {
        dateTime: new Date(eventObj.start.local).toISOString(),
        timezone: eventObj.start.timezone,
      },
      end: {
        dateTime: new Date(eventObj.end.local).toISOString(),
        timezone: eventObj.start.timezone,
      },
    };
    axios
      .post(
        // "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        "https://calendar.google.com/calendar/u/0/r/eventedit",
        event,
        {
          headers: {
            Authorization: `Bearer ${session?.provider_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        alert("Event created. Check your google calendar.");
        navigate("/eventslist");
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="relative flex flex-col rounded-xl bg-transparent items-center font-medium">
        <h4
          style={{ color: "#d5f483" }}
          // className="block text-4xl font-large text-center mt-12 mb-10"
          className="block text-3xl font-large text-center mt-1 mb-2"
        >
          Event Details
        </h4>

        <div>
          <h2
            style={{ fontSize: "20px", color: "#d5f483" }}
            className="block mb-1"
          >
            Event Name: {eventObj.name.text}
          </h2>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p style={{ color: "#f4f4f4" }} className="block mb-2 mt-4 text-sm">
            Event Description
          </p>
          <div
            style={{
              backgroundColor: "#beb5ef",
              border: "1px solid #beb5ef",
              height: "100px",
              borderRadius: "5px",
            }}
          >
            <textarea
              style={{ height: "100px" }}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              id="eventDescription"
              defaultValue={eventObj.description.text}
              readOnly
            />
          </div>
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-2">
          <p style={{ color: "#f4f4f4" }} className="block mb-2 text-sm">
            Event Date
          </p>
          <p
            style={{
              backgroundColor: "#beb5ef",
              border: "1px solid #beb5ef",
              height: "40px",
              borderRadius: "5px",
            }}
            className="w-full bg-transparen text-slate-700 text-sm px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            {new Date(eventObj.start.local).toLocaleDateString()}
          </p>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p style={{ color: "#f4f4f4" }} className="block mb-2 text-sm">
            Start Time
          </p>
          <p
            style={{
              backgroundColor: "#beb5ef",
              border: "1px solid #beb5ef",
              height: "40px",
              borderRadius: "5px",
            }}
            className="w-full  placeholder:text-slate-400 text-slate-700 text-sm px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            {new Date(eventObj.start.local)
              .toLocaleTimeString([], {
                hour12: true,
              })
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
          </p>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p style={{ color: "#f4f4f4" }} className="block mb-2 text-sm ">
            End Time
          </p>
          <p
            style={{
              backgroundColor: "#beb5ef",
              border: "1px solid #beb5ef",
              height: "40px",
              borderRadius: "5px",
            }}
            className="w-full placeholder:text-slate-400 text-slate-700 text-sm px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            {new Date(eventObj.end.local)
              .toLocaleTimeString([], {
                hour12: true,
              })
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
          </p>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p style={{ color: "#f4f4f4" }} className="block mb-2 text-sm ">
            Event Location
          </p>
          <p
            style={{
              backgroundColor: "#beb5ef",
              border: "1px solid #beb5ef",
              height: "40px",
              borderRadius: "5px",
            }}
            className="w-full placeholder:text-slate-400 text-slate-700 text-sm  px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            {locationName.name}
          </p>
          <div className="flex justify-center mt-2">
            <button
              style={{
                backgroundColor: "#beb5ef",
                color: "#486570",
                border: "5px solid #d5f483",
              }}
              className="flex items-center gap-4 px-5 py-3 rounded-lg shadow-md hover:opacity-90 transition"
              onClick={() => creatEventButton()}
            >
              <CalendarPlus size={20} />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;

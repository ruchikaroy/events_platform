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
  console.log("logging event Object", eventObj);

  const [locationName, setLocationName] = useState({ name: "" });

  const session = useSession();

  useEffect(() => {
    axios
      .get(
        `https://www.eventbriteapi.com/v3/venues/${eventObj.venue_id}/?token=${token}`
      )
      .then((response) => {
        setLocationName(response.data);
        console.log("this is location", response.data.name);
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
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
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
        console.log(session?.provider_token);
      });
    console.log("This is summary", event.summary);
  };

  return (
    <>
      <div className="relative flex flex-col rounded-xl bg-transparent items-center">
        <h4 className="block text-4xl font-large text-slate-800 text-center mt-12 mb-10">
          Event Details
        </h4>

        <div>
          <h2
            style={{ fontSize: "20px" }}
            className="block mb-2 text-slate-800"
          >
            Event Name: {eventObj.name.text}
          </h2>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p className="block mb-2 mt-4 text-sm text-slate-600">
            Event Description
          </p>
          <textarea
            style={{ height: "100px" }}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
            id="eventDescription"
            defaultValue={eventObj.description.text}
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p className="block mb-2 text-sm text-slate-600">Event Date</p>
          <p className="w-full bg-transparen text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
            {new Date(eventObj.start.local).toLocaleDateString()}
          </p>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p className="block mb-2 text-sm text-slate-600">Start Time</p>
          <p className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
            {new Date(eventObj.start.local)
              .toLocaleTimeString([], {
                hour12: true,
              })
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
          </p>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p className="block mb-2 text-sm text-slate-600">End Time</p>
          <p className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
            {new Date(eventObj.end.local)
              .toLocaleTimeString([], {
                hour12: true,
              })
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
          </p>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <p className="block mb-2 text-sm text-slate-600">Event Location</p>
          <p className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
            {locationName.name}
          </p>
          <div className="flex justify-center mt-6">
            <button
              style={{ backgroundColor: "#ef5437" }}
              className="flex items-center gap-4 text-white px-5 py-3 rounded-lg shadow-md hover:opacity-90 transition"
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

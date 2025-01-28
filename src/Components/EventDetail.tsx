import Event from "../../Types/eventDataTypes";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "@supabase/auth-helpers-react";
import NavBar from "./NavBar";

const EventDetail = () => {
  const location = useLocation();

  const token = import.meta.env.VITE_EB_TOKEN;
  const { register, handleSubmit } = useForm();

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

  const onSubmit = () => {
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
      })
      .catch((error: Error) => {
        console.log(error);
        console.log(session?.provider_token);
      });
    console.log("This is summary", event.summary);
  };

  return (
    <>
      <NavBar />
      <div className="relative flex flex-col rounded-xl bg-transparent items-center">
        <h4 className="block text-4xl font-large text-slate-800 text-center mt-12">
          Event Details
        </h4>
        <p className="text-slate-500 font-light text-center mt-8">
          Nice to meet you! See event details to add to your calendar.
        </p>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full max-w-sm min-w-[200px]">
            <label id="eventName" className="block mb-2 text-sm text-slate-600">
              Event Name
            </label>
            <input
              {...register("eventName")}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              id="eventName"
              defaultValue={eventObj.name.text}
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label
              id="eventDescription"
              className="block mb-2 text-sm text-slate-600"
            >
              Event Description
            </label>
            <textarea
              {...register("eventDescription")}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow h-52"
              id="eventDescription"
              defaultValue={eventObj.description.text}
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label id="eventName" className="block mb-2 text-sm text-slate-600">
              Event Date
            </label>
            <input
              {...register("eventDate")}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              id="eventDate"
              defaultValue={new Date(eventObj.start.local).toLocaleDateString()}
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label id="eventName" className="block mb-2 text-sm text-slate-600">
              Start Time
            </label>
            <input
              {...register("startTime")}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              id="startTime"
              defaultValue={new Date(eventObj.start.local)
                .toLocaleTimeString([], {
                  hour12: true,
                })
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label id="eventName" className="block mb-2 text-sm text-slate-600">
              End Time
            </label>
            <input
              {...register("endTime")}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              id="endTime"
              defaultValue={new Date(eventObj.end.local)
                .toLocaleTimeString([], {
                  hour12: true,
                })
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label id="eventName" className="block mb-2 text-sm text-slate-600">
              Event Location
            </label>
            <input
              {...register("location")}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              id="location"
              defaultValue={locationName.name}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default EventDetail;

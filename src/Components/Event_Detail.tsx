import Event from "../../Types/eventDataTypes";
import { useLocation } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface VenueLocation {
  name: string;
}

const Event_Detail = () => {
  const location = useLocation();
  const token = import.meta.env.VITE_EB_TOKEN;
  const { register, handleSubmit, formState } = useForm<Event>();
  const { eventObj } = location.state as { eventObj: Event }; // retreive the eventObj from the state property in event detail component using useLocation hook
  const [name, setName] = useState<VenueLocation>({ name: "" });
  useEffect(() => {
    axios
      .get<VenueLocation>(
        `https://www.eventbriteapi.com/v3/venues/${eventObj.venue_id}/?token=${token}`
      )
      .then((response) => {
        setName(response.data);
        console.log("this is location", response.data.name);
      })
      .catch((error: AxiosError) => {
        console.log("Error in fetching the location name", error);
      });
  }, []);
  return (
    <>
      <div className="relative flex flex-col rounded-xl bg-transparent items-center">
        <h4 className="block text-4xl font-large text-slate-800 text-center mt-12">
          Event Details
        </h4>
        <p className="text-slate-500 font-light text-center mt-8">
          Nice to meet you! See event details to add to your calendar.
        </p>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="w-full max-w-sm min-w-[200px]">
            <label id="eventName" className="block mb-2 text-sm text-slate-600">
              Event Name
            </label>
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Your Name"
              id="eventName"
              defaultValue={eventObj.name.text}
            />
          </div>
          <p>{name.name}</p>
        </form>
      </div>
    </>
  );
};

export default Event_Detail;

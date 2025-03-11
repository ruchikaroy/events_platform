import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateEventForm = () => {
  const token = import.meta.env.VITE_EB_ADMIN_TOKEN;
  const organizationId = import.meta.env.VITE_EB_ORGANIZATION_ID;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  // const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    timezone: "UTC",
    currency: "GBP",
    id: "956452663",
    freeEntry: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCategory(e.target.value);
  // };

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    setIsLoading(true);

    if (!token || !organizationId) {
      setMessage(
        "Missing API credentials. Please check your environment variables."
      );
      console.error("Error: Missing API token or organization ID.");
      setDisable(false);
      setIsLoading(false);
      return;
    }
    const currentTime = new Date();
    const selectedStartTime = new Date(formData.startTime);
    const selectedEndTime = new Date(formData.endTime);

    if (selectedStartTime < currentTime) {
      toast.error(
        "Start time cannot be in the past. Please select a future time."
      );
      setDisable(false);
      setIsLoading(false);
      return;
    }
    if (selectedStartTime > selectedEndTime) {
      toast.error(
        "Start time cannot be before end time. Please select appropprite start time."
      );
      setDisable(false);
      setIsLoading(false);
      return;
    }

    const requestData = {
      event: {
        name: { html: formData.name },
        description: { html: formData.description },
        start: {
          timezone: formData.timezone,
          utc: new Date(formData.startTime)
            .toISOString()
            .replace(/\.\d{3}Z$/, "Z"),
        },
        end: {
          timezone: formData.timezone,
          utc: new Date(formData.endTime)
            .toISOString()
            .replace(/\.\d{3}Z$/, "Z"),
        },
        currency: formData.currency,
        logo: { id: formData.id },
        venue_id: "249658623",
      },
    };

    console.log("Submitting event:", JSON.stringify(requestData, null, 2));

    axios
      .post(
        `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const eventId = response.data.id;
        setMessage("Event Created Successfully!");
        setIsLoading(false);
        console.log("Event Created:", response.data);

        return axios
          .post(
            `https://www.eventbriteapi.com/v3/events/${eventId}/ticket_classes/`,

            {
              ticket_class: {
                name: "General Admission",
                free: formData.freeEntry === "true" || "True",
                capacity: "100",
                minimum_quantity: "1",
                maximum_quantity: "10",
                sales_channels: ["online", "atd"],
                delivery_methods: ["electronic"],
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((ticketResponse) => {
            console.log("Ticket created successfully", ticketResponse.data);
            setMessage("Ticket created successfully");
            setIsLoading(false);

            return axios.post(
              `https://www.eventbriteapi.com/v3/events/${ticketResponse.data.event_id}/publish/`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
          })
          .then((publishResponse) => {
            console.log("Event Published", publishResponse.data);
            setMessage(
              "Event created, ticket added and published successfully"
            );
            setIsLoading(false);
            setTimeout(() => {
              toast.success("Event creation is complete!");
              navigate("/eventslist");
            }, 2000);
          })

          .catch((error) => {
            if (axios.isAxiosError(error)) {
              console.error(
                "Error creating the event:",
                error.response?.data || error.message
              );
              setMessage(
                `Failed to create the event: ${
                  error.response?.data?.error_description || error.message
                }`
              );
            } else {
              console.error("Unexpected error:", error);
              setMessage(
                "An unexpected error occurred while creating the event."
              );
            }
          });
      });
  };

  return (
    <>
      <div className="relative flex flex-col rounded-xl items-center justify-center mt-5">
        <h1
          style={{ color: "#d5f483" }}
          className=" text-center text-3xl block font-thin"
        >
          Create an Event!
        </h1>
        <div>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmission}
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  style={{
                    color: "#d5f483",
                    fontSize: "20px",
                  }}
                  className=" block mb-2 text-md font-thin"
                  htmlFor="name"
                >
                  Event Name
                </label>
                <input
                  type="text"
                  className="w-full text-md rounded-md px-4 py-2 focus:outline-none shadow-sm focus:shadow "
                  placeholder="Event Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#beb5ef",
                    color: "#486570 !important",
                    width: "200px",
                  }}
                  required
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="description"
                  style={{
                    color: "#d5f483",
                    fontSize: "20px",
                  }}
                  className="block mb-2 text-md font-thin"
                >
                  Event Description
                </label>
                <input
                  type="text"
                  className="w-full text-md rounded-md px-3 py-2 focus:outline-none  shadow-sm focus:shadow"
                  style={{
                    backgroundColor: "#beb5ef",
                    color: "#486570 !important",
                  }}
                  placeholder="Event Description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="startTime"
                  style={{
                    color: "#d5f483",
                    fontSize: "20px",
                  }}
                  className="block mb-2 text-md font-thin"
                >
                  Start Time
                </label>
                <input
                  className="w-full text-md rounded-md px-3 py-2 focus:outline-none  shadow-sm focus:shadow"
                  style={{
                    backgroundColor: "#beb5ef",
                    color: "#486570",
                  }}
                  placeholder="Enter Start Time"
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="endTime"
                  style={{
                    color: "#d5f483",
                    fontSize: "20px",
                  }}
                  className="block mb-2 text-md font-thin"
                >
                  End Time
                </label>
                <input
                  className="w-full text-md rounded-md px-3 py-2 focus:outline-none  shadow-sm focus:shadow"
                  style={{ backgroundColor: "#beb5ef", color: "#486570" }}
                  placeholder="Enter End Time"
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="currency"
                  style={{
                    color: "#d5f483",
                    fontSize: "20px",
                  }}
                  className="block mb-2 text-md font-thin"
                >
                  Currency
                </label>
                <input
                  className="w-full text-md rounded-md px-3 py-2 focus:outline-none shadow-sm focus:shadow"
                  style={{ backgroundColor: "#beb5ef", color: "#486570" }}
                  type="text"
                  id="currency"
                  name="currency"
                  value="GBP"
                  readOnly
                />
              </div> */}
              {/* <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="freeEntry"
                  style={{
                    color: "#d5f483",
                    fontSize: "20px",
                  }}
                  className="block mb-2 text-md font-thin"
                >
                  Free Event
                </label>
                <input
                  className="w-full text-md rounded-md px-3 py-2 focus:outline-none  shadow-sm focus:shadow mb-3"
                  style={{
                    backgroundColor: "#beb5ef",
                    color: "#486570",
                  }}
                  type="text"
                  id="freeEntry"
                  name="freeEntry"
                  value="True"
                  readOnly
                />
              </div> */}
              {/* <div>
                <img src={formData.id} alt="Event Logo" />
              </div> */}
            </div>
            <div className="mt-3 flex flex-col items-center justify-items-center w-full">
              <button
                className={`w-75 text-md rounded-md px-3 py-3 text-center focus:outline-none  shadow-sm focus:shadow justify-self-center mt-2 bg-[#d5f483] text-[#486570] ${
                  disable
                    ? "cursor-not-allowed opacity-50"
                    : " hover:bg-white hover:text-[#486570] border transition-all duration-200 cursor-pointer"
                } `}
                type="submit"
                disabled={disable}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Spinner animation="border" variant="white" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <p
              className="font-thin"
              style={{ color: "#f4f4f4", fontSize: "20px", cursor: "pointer" }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateEventForm;

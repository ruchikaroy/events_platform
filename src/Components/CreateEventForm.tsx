import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const token = import.meta.env.VITE_EB_ADMIN_TOKEN;
  const organizationId = import.meta.env.VITE_EB_ORGANIZATION_ID;
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    timezone: "UTC",
    currency: " GBP",
    id: "928469323",
    freeEntry: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || !organizationId) {
      setMessage(
        "Missing API credentials. Please check your environment variables."
      );
      console.error("Error: Missing API token or organization ID.");
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
        console.log("Event Created:", response.data);

        return axios
          .post(
            `https://www.eventbriteapi.com/v3/events/${eventId}/ticket_classes/`,

            {
              ticket_class: {
                name: "General Admission",
                free: formData.freeEntry === "true",
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
            setTimeout(() => {
              alert("Event creation is complete!");
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
    <div>
      <h1>Create an Event</h1>
      <form onSubmit={handleSubmission}>
        <div>
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Free Event</label>
          <input
            type="text"
            id="freeEntry"
            name="freeEntry"
            value={formData.freeEntry}
            onChange={handleChange}
          />
        </div>
        <div>
          <img src={formData.id} alt="Event Logo" />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateEventForm;

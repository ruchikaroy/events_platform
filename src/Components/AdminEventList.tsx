import EventCard from "./EventCard";

const AdminEventList = () => {
  return (
    <div>
      <EventCard isAdmin={true} showActions={true} />
    </div>
  );
};

export default AdminEventList;

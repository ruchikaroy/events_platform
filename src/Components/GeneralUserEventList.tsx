import EventCard from "./EventCard";

const GeneralUserEventList = () => {
  return (
    <div>
      <EventCard isAdmin={false} showActions={false} />
    </div>
  );
};

export default GeneralUserEventList;

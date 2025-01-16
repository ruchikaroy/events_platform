type Event = {
  id: string;
  name: {
    text: string;
  };
  description: {
    text: string;
  };
  logo?: {
    original: {
      url: string;
    };
  };
  start: {
    local: string;
    timezone: string;
    utc: string;
  };
  end: {
    local: string;
    timezone: string;
    utc: string;
  };
};
export default Event;
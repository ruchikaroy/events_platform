import { useNavigate } from "react-router";
import ImageToAdd from "./assets/Blue Pink Playful Weekly Newsletter Email Header.png";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/eventslist", { replace: true });

  return (
    <>
      <img src={ImageToAdd} />
      <button onClick={handleClick}>click Here to Browse</button>
    </>
  );
};

export default Home;

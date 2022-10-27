import { useNavigate } from "react-router-dom";
import "./activatelayout.scss";

const ActivateLayout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="activate">
      <p>
        Ready to login ? 👉 <span onClick={handleClick}>Here</span>
      </p>
    </div>
  );
};

export default ActivateLayout;

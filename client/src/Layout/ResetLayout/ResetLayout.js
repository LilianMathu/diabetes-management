import { useNavigate } from "react-router-dom";
import Reset from "../../Pages/Reset/Reset";
import "./resetlayout.scss";

const ResetLayout = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="authlayout">
      {/* Page Logo */}
      <div className="authlayout_logo">
        <img src={require("../../assets/images/vpl.png")} alt="VPL" />
      </div>

      {/* Form to be rendered */}
      <Reset />

      {/* Form actions */}
      <p className="reset_p" onClick={handleClick}>
        Login ?
      </p>
    </div>
  );
};

export default ResetLayout;

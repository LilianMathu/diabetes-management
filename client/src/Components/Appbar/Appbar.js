import Avatar from "../Avatar/Avatar";
import { AiOutlineMenu } from "react-icons/ai";
import "./appbar.scss";

const Appbar = ({ handleSidebar }) => {
  return (
    <div className="appbar">
      <div className="appbar_wrapper">
        {/* Logo */}
        <div className="appbar_logo">
          <img src={require("../../assets/images/vpl.png")} alt="VPL" />
          <p>Diabetes MNGT</p>
        </div>

        {/* Avatar */}
        <div className="appbar_avatar">
          <Avatar />
          <AiOutlineMenu onClick={handleSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Appbar;

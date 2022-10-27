import { useRef, useState } from "react";
import Avatar from "../../Components/Avatar/Avatar";
import { AiFillCamera } from "react-icons/ai";
import "./profile.scss";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Input from "../../Components/Input/Input";

const Profile = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const inputFile = useRef(null);

  const handleInput = () => {
    inputFile.current.click();
  };

  return (
    <div className="profile">
      {/* Avatar */}
      <div className="profile_avatar">
        <div className="profile_avatar_wrapper" onClick={handleInput}>
          <Avatar />
          <AiFillCamera />
        </div>
        <input
          type="file"
          name="avatar"
          ref={inputFile}
          className="profile_avatar_input"
        />
      </div>

      {/* form */}
      <form className="profile_input">
        <div className="profile_input_form">
          <Input type="text" text="name" />
          <Input type="text" text="Email" />
          <Input
            type={visible ? "text" : "password"}
            icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
            handleClick={handleClick}
            text="Password"
          />
          <Input
            type={visible ? "text" : "password"}
            icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
            handleClick={handleClick}
            text="Confirm password"
          />
          <div className="login_btn">
            <button>Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;

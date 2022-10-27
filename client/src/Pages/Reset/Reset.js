import Input from "../../Components/Input/Input";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const Reset = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <form>
      <Input
        text="Password"
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        handleClick={handleClick}
      />
      <Input
        text="Confirm Password"
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        handleClick={handleClick}
      />
      <div className="login_btn">
        <button>Reset</button>
      </div>
    </form>
  );
};

export default Reset;

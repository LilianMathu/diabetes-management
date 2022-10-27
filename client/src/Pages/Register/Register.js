import Input from "../../Components/Input/Input";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import "./register.scss";
import { useState } from "react";

const Register = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <form>
      <Input type="text" text="Name" />
      <Input type="text" text="Email" />
      <Input
        type={visible ? "text" : "password"}
        text="Password"
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        handleClick={handleClick}
      />
      <Input
        type={visible ? "text" : "password"}
        text="Confim Password"
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        handleClick={handleClick}
      />
      <div className="login_btn">
        <button>Register</button>
      </div>
    </form>
  );
};

export default Register;

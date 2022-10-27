import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Input from "../../Components/Input/Input";
import "./login.scss";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <form className="login">
      <Input type="email" text="Email" />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Password"
        handleClick={handleClick}
      />
      <div className="login_btn">
        <button>Login</button>
        <button className="btn_alt">
          Sign in <FcGoogle />
        </button>
      </div>
    </form>
  );
};

export default Login;

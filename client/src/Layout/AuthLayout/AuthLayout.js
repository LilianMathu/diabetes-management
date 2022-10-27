import { useState } from "react";
import Forgot from "../../Pages/Forgot/Forgot";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import "./authlayout.scss";

const AuthLayout = () => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [forgot, setForgot] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    setRegister(false);
    setForgot(false);
  };

  const handleRegister = () => {
    setLogin(false);
    setRegister(true);
    setForgot(false);
  };

  const handleForgot = () => {
    setLogin(false);
    setRegister(false);
    setForgot(true);
  };

  return (
    <div className="authlayout">
      {/* Page logo */}
      <div className="authlayout_logo">
        <img
          src={require("../../assets/images/vpl.png")}
          alt="Vector Projects Ltd"
        />
      </div>

      {/* Forms to be rendered */}
      {login && <Login />}
      {register && <Register />}
      {forgot && <Forgot />}

      {/* Form actions */}
      <div className="authlayout_actions">
        <p
          className="authlayout_actions_left"
          onClick={login ? handleRegister : handleLogin}
        >
          {login ? "Register" : "Login"}
        </p>
        <p className="authlayout_actions_right" onClick={handleForgot}>
          Forgot?
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;

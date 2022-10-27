import Input from "../../Components/Input/Input";
import "./forgot.scss";

const Forgot = () => {
  return (
    <form>
      <Input type="text" text="Email" />
      <div className="login_btn">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Forgot;

import { AiOutlineDashboard, AiOutlineMessage } from "react-icons/ai";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_menu">
        <nav>
          <ul>
            <li>
              <AiOutlineDashboard />
              <NavLink to="/dashboard">
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li>
              <MdOutlinePeopleAlt />
              <NavLink to="/patients">
                <p>Patients</p>
              </NavLink>
            </li>

            <li>
              <AiOutlineMessage />
              <NavLink to="/messages">
                <p>Messages</p>
              </NavLink>
            </li>

            <li>
              <BiSupport />
              <NavLink to="/support">
                <p>Support</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

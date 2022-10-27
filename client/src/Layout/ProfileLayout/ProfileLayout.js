import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Appbar from "../../Components/Appbar/Appbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "../../Components/Table/Table";
import Messages from "../../Components/Messages/Messages";
import "./profilelayout.scss";

const ProfileLayout = () => {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="profilelayout">
      {/* appbar */}
      <Appbar handleSidebar={handleSidebar} />

      {/* sidebar */}
      <div
        className={
          sidebar ? "profilelayout_sidebar open" : "profilelayout_sidebar"
        }
      >
        <Sidebar />
      </div>

      <div className="profilelayout_content">
        <Routes>
          <Route path="/messages" element={<Messages />} />
          <Route path="/patients" element={<Table />} />
        </Routes>

        {/* <div className="table">
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default ProfileLayout;

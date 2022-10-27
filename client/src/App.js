import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivateLayout from "./Layout/ActivateLayout/ActivateLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import ProfileLayout from "./Layout/ProfileLayout/ProfileLayout";
import ResetLayout from "./Layout/ResetLayout/ResetLayout";

function App() {
  const isLoggedIn = true;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={isLoggedIn ? <ProfileLayout /> : <AuthLayout />}
          />
          <Route path="/auth/reset-password/:token" element={<ResetLayout />} />
          <Route
            path="/api/auth/activate/:activate_token"
            element={<ActivateLayout />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

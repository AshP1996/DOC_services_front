import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./home_section/homepage/Homepage"; // Import Homepage component
import Login from "./accounts/components/Login";
import Signup from "./accounts/components/Signup";
import Dashboard from "./dashboard/components/Dashboard";
import Profile from "./dashboard/components/Profile";
import UpdateProfile from "./dashboard/components/UpdateProfile";
import FindDoctor from "./home_section/homepage/FindDoctor"; // Import FindDoctor component

const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  // Optional: Add token expiration check logic here if needed.
  return !!token;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<Homepage />} />

        {/* Login and Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard route (protected) */}
        <Route
          path="/dashboard/*"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* Profile routes (protected) */}
        <Route
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/update-profile"
          element={isAuthenticated() ? <UpdateProfile /> : <Navigate to="/login" replace />}
        />
        {/* Find Doctor route */}
        <Route path="/find-doctor" element={<FindDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;

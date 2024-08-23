import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navlink from "./components/Navlink";
import Welcomepage from "./components/Welcomepage";
import LogOption from "./components/LogOption";
import SigninDistributor from "./components/SigninDistributor";
import SignOption from "./components/SignOption";
import LogDistributor from "./components/LogDistributor";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddNewPro from "./components/AddNewPro";
import AllProduct from "./components/AllProduct";
import Message from "./components/Message";
import TeamMember from "./components/TeamMember";
import Profile from "./components/Profile";
import ManufacturerForm from "./components/ManufacturerForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(
        "https://meds-scan-backend.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile");
      }

      const data = await response.json();
      setIsAuthenticated(true);
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("token"); // Remove token from local storage
      setIsAuthenticated(false); // Set authentication state to false
      setUserProfile(null); // Clear user profile
      window.location.href = "/option"; // Redirect to login page
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <Navlink
              isAuthenticated={isAuthenticated}
              userProfile={userProfile}
            />
          }
        >
          <Route path="" element={<Welcomepage />} />
        </Route>


        <Route
          path="login"
          element={<SigninDistributor />}
        />
        <Route path="/signup" element={<SignOption />} />
        <Route path="signup/LogDistributor" element={<LogDistributor />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/addNewPro"
          element={<ProtectedRoute component={AddNewPro} />}
        />
        <Route
          path="/allProducts"
          element={<ProtectedRoute component={AllProduct} />}
        />
        <Route
          path="/trackProducts"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/team"
          element={<ProtectedRoute component={TeamMember} />}
        />
        <Route
          path="/message"
          element={<ProtectedRoute component={Message} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path="/addStock"
          element={<ProtectedRoute component={ManufacturerForm} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navlink from "./components/Navlink";
import Welcomepage from "./components/Welcomepage";
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
import Layout from "./components/dashboards/layout";
import Dashboards from "./components/dashboards/dashboard";
import CountryState from "./components/country";
import PhoneNumberInput from "./components/phoneNumber";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import { AuthProvider } from "./Helper/AuthContext";
import LogOption from "./components/LogOption";
import SignInManufactur from "./components/SigninDistributor";
import Policy from "./components/policy";
import Terms from "./components/terms";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token);
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false); // Set loading to false if no token
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      // Check if token is correctly retrieved
      if (!token) {
        console.error("Token is missing, cannot fetch profile.");
        return;
      }
      
      const response = await fetch(
        "https://medscan-backend-4lgk.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        throw new Error(errorData.message || "Failed to fetch user profile");
      }
  
      const data = await response.json();
      setIsAuthenticated(true);
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("token"); // Remove token on error
      setIsAuthenticated(false);
      setUserProfile(null);
      window.location.href = "/"; 
    } finally {
      setLoading(false); // Ensure loading is false after attempt
    }
  };
  

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while fetching the user profile
  }

  return (
    <AuthProvider>
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

          <Route path="/login/:type" element={<SignInManufactur />} />
          <Route path="/signup" element={<SignOption />} />
          <Route path="signup/:type" element={<LogDistributor />} />
          <Route path="/country" element={<CountryState />} />
          <Route path="/number" element={<PhoneNumberInput />} />
          <Route path="logoption" element={<LogOption />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/dashboards"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route path="/dashboard" element={<ProtectedRoute component={Layout} />}>
            <Route path="" element={<Dashboards />} />
            <Route path="/dashboard/all-products" element={<AllProduct />} />
            <Route path="/dashboard/add-products" element={<AddNewPro />} />
            <Route path="/dashboard/team-members" element={<TeamMember />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/logout" element={<AllProduct />} />
            <Route path="/dashboard/export-data" element={<AllProduct />} />
            <Route path="/dashboard/support" element={<AllProduct />} />
            <Route path="/dashboard/message" element={<Message />} />
            <Route path="/dashboard/track-product" element={<Dashboards />} />
          </Route>
          <Route path="/addStock" element={<ProtectedRoute component={ManufacturerForm} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
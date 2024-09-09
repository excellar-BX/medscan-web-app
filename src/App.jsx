import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navlink from "./components/Navlink";
import Welcomepage from "./components/Welcomepage";
// import SigninDistributor from "./components/SigninDistributor";
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
// import State from "./components/country";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(
        "https://medscan-backend.vercel.app/api/auth/profile",
        // "http://localhost:5000/api/auth/profile",
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
      // window.location.href = "/logoption"; // Redirect to login page
    }
  };

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
          }>
          <Route path="" element={<Welcomepage />} />
         
       
        </Route>

        {/* <Route path="/login" element={<SigninDistributor />} /> */}
         <Route path="/login/:type" element={<SignInManufactur/>} />
        <Route path="/signup" element={<SignOption />} />
        <Route path="signup/:type" element={<LogDistributor />} />
        <Route path='/country' element={<CountryState />} />
        <Route path='/number' element={<PhoneNumberInput />} />
         <Route path='logoption' element={<LogOption />} />
         <Route path="/about-us" element={<AboutUs />} />
         <Route path="/contact-us" element={<ContactUs />} />
         <Route path="/contact-us" element={<ContactUs />} /> 
         <Route path="/policy" element={<Policy />} />
         <Route path="/terms" element={<Terms />} />
        <Route
          path="/dashboards"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Layout} />}>
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
          {/* Add more nested routes here if necessary */}
        </Route>
        {/* <Route
          path="/dashboards"
          element={<ProtectedRoute component={Dashboard} />}
        /> */}
        {/* <Route
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
        /> */}
        <Route
          path="/addStock"
          element={<ProtectedRoute component={ManufacturerForm} />}
        />
      </Routes>
    </Router>
    </AuthProvider>

  );
}

export default App;

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
// import App from "./App.jsx";
import Navlink from "./components/Navlink";
// import Welcomepage from "./components/Welcomepage";
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
// import { AuthProvider } from "./Helper/AuthContext";
import LogOption from "./components/LogOption";
import SignInManufactur from "./components/SigninDistributor";
import Policy from "./components/policy";
import Terms from "./components/terms";
import "./index.css";

// Configure router
const router = createBrowserRouter([
  { path: "/", element: <Navlink /> },
  { path: "login/:type", element: <SignInManufactur /> },
  { path: "signup", element: <SignOption /> },
  { path: "signup/:type", element: <LogDistributor /> },
  { path: "country", element: <CountryState /> },
  { path: "number", element: <PhoneNumberInput /> },
  { path: "logoption", element: <LogOption /> },
  { path: "about-us", element: <AboutUs /> },
  { path: "contact-us", element: <ContactUs /> },
  { path: "policy", element: <Policy /> },
  { path: "terms", element: <Terms /> },
  // {
  //   path: "dashboards",
  //   element: <ProtectedRoute component={Dashboard} />,
  // },
  {
    path: "dashboard",
    element: <ProtectedRoute component={Layout} />,
    children: [
      { path: "", element: <Dashboards /> },
      { path: "all-products", element: <AllProduct /> },
      { path: "add-products", element: <AddNewPro /> },
      { path: "team-members", element: <TeamMember /> },
      { path: "profile", element: <Profile /> },
      { path: "logout", element: <AllProduct /> },
      { path: "export-data", element: <AllProduct /> },
      { path: "support", element: <AllProduct /> },
      { path: "message", element: <Message /> },
      { path: "track-product", element: <Dashboards /> },
    ],
  },
  {
    path: "addStock",
    element: <ProtectedRoute component={ManufacturerForm} />,
  },
]);

// Render app with Provider and RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

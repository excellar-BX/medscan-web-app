import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaUserCircle,
  FaBell,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { navlink } from "../data-link";
import logo from "../assets/images/image 2.png";

export default function Navlink({ isAuthenticated, userProfile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="nav-logo" className="h-10" />
            <h1 className="text-2xl font-[500]">
              <Link to="/">MedScan </Link>{" "}
            </h1>
          </div>

          <div className="lg:flex gap-5 items-center max-sm:hidden sm:hidden max-md:hidden md:hidden">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-[500] hover:underline hover:decoration-blue-500">
                <Link to="/about-us">About</Link>{" "}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-[500] hover:underline hover:decoration-blue-500">
                <Link to="/contact-us">Contact Us </Link>{" "}
              </h1>
            </div>
          </div>

          {/* Hamburger Menu Icon for Mobile/Tablet */}
          <div className="lg:hidden flex items-center">
            <FaBars
              onClick={toggleMenu}
              size={30}
              className="cursor-pointer hover:text-blue-300"
            />
          </div>

          {/* Auth Links (hidden on mobile) */}
          <div className="hidden lg:flex ml-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="ml-4 py-2 px-4 bg-transparent border border-blue-500 text-blue-500 rounded focus:outline-none hover:bg-blue-500 hover:text-white"
                >
                  Sign up
                </Link>
                <Link
                  to="/logoption"
                  className="py-2 px-4 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="mr-2 py-2 px-4 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token"); // Remove the JWT token
                    localStorage.removeItem("userId"); // Remove the user ID (if stored)
                    window.location.href = "/signup"; // Redirect to the login page or any other page
                  }}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay Menu for Mobile/Tablet */}
      {menuOpen && (
        <div className="fixed inset-0 h-screen flex flex-col justify-start background-blur-[5px] items-start z-50">
          <div className="flex flex-col bg-white h-full p-8 w-[60%] relative">
            <FaTimes
              onClick={toggleMenu}
              size={30}
              className="text-black  cursor-pointer absolute top-5 right-5"
            />
            <img src={logo} alt="Logo" className="mb-8 h-12 w-12" />
            <ul className="text-black text-[20px] font-[500] space-y-6">
              {navlink.map((link, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center w-full hover:underline hover:decoration-blue-500"
                >
                  <Link
                    to={link.path}
                    onClick={toggleMenu}
                    className="hover:text-blue-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {!isAuthenticated ? (
                <>
                  <div className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]">
                    <li>
                      <Link
                        to="/logoption"
                        onClick={toggleMenu}
                        className="text-white"
                      >
                        Sign in
                      </Link>
                    </li>
                  </div>
                  <div className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] border border-[#0084FC]">
                    <li>
                      <Link
                        to="/signup"
                        onClick={toggleMenu}
                        className="text-blue-500"
                      >
                        Sign up
                      </Link>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token"); // Remove the JWT token
                      localStorage.removeItem("userId"); // Remove the user ID (if stored)
                      window.location.href = "/signup"; // Redirect to the login page or any other page
                    }}
                    className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-red-500 w-full"
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

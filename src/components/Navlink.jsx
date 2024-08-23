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
            <h1 className="text-2xl font-bold">
              <Link to="/">MedScan </Link>{" "}
            </h1>
          </div>

          {/* Hamburger Menu Icon for Mobile/Tablet */}
          <div className="lg:hidden flex items-center">
            <FaBars
              onClick={toggleMenu}
              size={30}
              className="cursor-pointer hover:text-blue-300"
            />
          </div>

          {/* Search Input */}
          {isAuthenticated && (
            <div className="hidden md:flex flex-grow mx-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              />
            </div>
          )}

          {/* Links (hidden on mobile) */}
          <ul className="hidden lg:flex space-x-6 text-xl font-semibold">
            {!isAuthenticated ? (
              navlink.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="hover:text-blue-300">
                    {link.name}
                  </Link>
                </li>
              ))
            ) : (
              <div className="flex items-center space-x-4">
                <FaBell
                  size={24}
                  className="cursor-pointer hover:text-blue-300"
                />
                <div className="flex items-center space-x-2">
                  <FaUserCircle size={30} />
                  <div className="text-xl font-semibold">
                    <span>{userProfile?.name}</span>
                    <br />
                    <span className="text-sm text-gray-400">
                      {userProfile?.email}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </ul>

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
                  to="/login"
                  className="py-2 px-4 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sign in
                </Link>
              </>
            ) : (
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
                  className="flex justify-between items-center w-full"
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
              {!isAuthenticated && (
                <>
                  <div className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]">
                    <li>
                      <Link
                        to="/login"
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
              )}
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

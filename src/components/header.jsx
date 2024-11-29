import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from "../assets/images/image 2.png";

function Header({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="w-full pt-7 pb-5 shadow-md">
        <div className="flex justify-between items-center w-[90%] m-auto">
          {/* Logo */}
          <div className="w-[80px]">
            <img src={logo} alt="nav-logo" className="h-10" />
          </div>

          {/* Nav Links for larger screens */}
          <nav className="hidden lg:flex gap-6">
            <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
              <Link to='/about-us'>ABOUT US</Link>
            </div>
            <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
              <Link to='/contact-us'>CONTACT</Link>
            </div>
            <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
              <Link to='/policy'>PRIVACY & POLICY</Link>
            </div>
            <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
              <Link to='/terms'>TERMS & CONDITIONS</Link>
            </div>
          </nav>

          {/* Toggle Menu Button for smaller screens */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 transition-transform transform z-50 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ width: '250px' }}
      >
        <div className="flex flex-col gap-6">
          <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
            <Link to='/about-us' onClick={toggleMenu}>ABOUT US</Link>
          </div>
          <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
            <Link to='/contact-us' onClick={toggleMenu}>CONTACT</Link>
          </div>
          <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
            <Link to='/policy' onClick={toggleMenu}>PRIVACY & POLICY</Link>
          </div>
          <div className="text-[16px] font-[900] font-[flame] hover:bg-[rgb(232,224,210)] hover:text-[#0019d7] rounded-xl p-[2.5px]">
            <Link to='/terms' onClick={toggleMenu}>TERMS & CONDITIONS</Link>
          </div>
        </div>
      </div>

      {/* Apply blur effect to the page content */}
      <div className={`transition-all duration-300 ${menuOpen ? 'blur-md' : ''}`}>
        {children}
      </div>

      {/* Overlay to close the menu when clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );

}

export default Header
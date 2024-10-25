import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCheckCircle } from "react-icons/fa";

const PricingPage = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center lg:py-10 max-sm:py-5 md:py-5 max-md:py-5">
      <h1 className="text-4xl font-bold mb-2">Pricing</h1>
      <p className='mb-2'>Here are our pricing plans for <span className='font-bold'>Manfacturers only!</span></p>
      {/* <div className="flex items-center mb-10">
        <span className="text-lg mr-2">Monthly</span>
        <input type="checkbox" id="toggle" className="toggle-checkbox hidden" />
        <label htmlFor="toggle" className="toggle-label bg-gray-700 relative inline-block w-14 h-8 rounded-full">
          <span className="toggle-button absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300"></span>
        </label>
        <span className="text-lg ml-2">Yearly <span className="text-sm">(Save 20%)</span></span>
      </div> */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <div className="bg-[#15212D] text-white rounded-lg p-6 shadow-lg w-72">
          <p className="text-3xl font-bold mb-4">Free</p>
          <p className="font-bold mb-3">$0.000</p>
          <p className="space-y-2 mb-3 text-sm">1 to 49 product units per month.</p>
            <p className='mb-2 underline'>Features</p>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>View Realtime Market Analysis on Dashboard</p>
            </div>
          <Link to="/signup">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-transparent hover:border hover:text-white hover:border-blue-600 transition">
                Get Started
            </button>
          </Link>
        </div>
        <div className="bg-[#15212D] text-white rounded-lg p-6 shadow-lg w-72">
          <p className="text-3xl font-bold mb-4">Bronze</p>
          <p className="font-bold mb-3">$0.032</p>
          <p className="space-y-2 mb-3 text-sm">per product unit if we're covering up to 9,999 products per month.</p>
          <p className='mb-2 underline'>Features</p>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>View Realtime Market Analysis on Dashboard</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Download / Export Market Analysis</p>
            </div>
          <Link to="/signup">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-transparent hover:border hover:text-white hover:border-blue-600 transition">
                Get Started
            </button>
          </Link>
        </div>
        <div className="bg-[#15212D] text-white rounded-lg p-6 shadow-lg w-72">
          <p className="text-3xl font-bold mb-4">Silver</p>
          <p className="font-bold mb-3">$0.022</p>
        <p className="space-y-2 mb-3 text-sm">per product unit for 10,000 to 99,999 products per month.</p>
        <p className='mb-2 underline'>Features</p>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>View Realtime Market Analysis on Dashboard</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Download / Export Market Analysis</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Download QR Codes For All Products</p>
            </div>
          <Link to="/signup">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-transparent hover:border hover:text-white hover:border-blue-600  transition">
                Get Started
            </button>
          </Link>
        </div>
        <div className="bg-[#15212D] text-white rounded-lg p-6 shadow-lg w-72">
          <p className="text-3xl font-bold mb-4">Gold</p>
          <p className="font-bold mb-3">$0.016</p>
        <p className="space-y-2 mb-3 text-sm">per product unit for 100k to 999,999 products per month.</p>
          <p className='mb-2 underline'>Features</p>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>View Realtime Market Analysis on Dashboard</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Download / Export Market Analysis</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Download QR Codes For All Products</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Dedicated 24/7 Medscan Agent</p>
            </div>
          <Link to="/signup">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-transparent hover:border hover:text-white hover:border-blue-600 transition">
                Get Started
            </button>
          </Link>
        </div>
        <div className="bg-[#15212D] text-white rounded-lg p-6 shadow-lg w-72">
          <p className="text-3xl font-bold mb-4">Diamond</p>
          <p className="font-bold mb-3">$0.010</p>
        <p className="space-y-2 mb-3 text-sm">per product unit for 1m products and above per month.</p>
        <p className='mb-2 underline'>Features</p>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>View Realtime Market Analysis on Dashboard</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Download / Export Market Analysis</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Download QR Codes For All Products</p>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <FaRegCheckCircle />
                <p className='text-xs'>Dedicated 24/7 Medscan Agent</p>
            </div>
          <Link to="/signup">
             <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-transparent hover:border hover:text-white hover:border-blue-600  transition">
                Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

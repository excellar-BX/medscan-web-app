import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/image 2.png';

export default function Footer() {
  return (
    <div className='bg-[#000000CC] text-white   lg:pt-10 lg:px-10'>
      <div className='md:max-w-[1440px] lg:px-0 p-8 mx-auto flex flex-wrap justify-between gap-8'>
        {/* Logo and Title */}
        <div className='flex flex-col items-center md:items-start md:w-fit w-full'>
          <img src={logo} alt="MEDSCAN AFRICA" className='w-20 h-20 mb-4' />
          <h1 className='text-lg font-bold'>MEDSCAN AFRICA</h1>
        </div>

        {/* Company Links */}
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold mb-4'>Company</h2>
          <Link to='/about-us' className='mb-2 hover:text-gray-400'>About us</Link>
          <Link to='/contact-us' className='mb-2 hover:text-gray-400'>Contact Us</Link>
        </div>

        {/* Resources Links */}
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold mb-4'>Resources</h2>
          <Link to='/policy' className='mb-2 hover:text-gray-400'>Privacy Policy</Link>
          <Link to='/terms' className='mb-2 hover:text-gray-400'>Terms & Conditions</Link>
        </div>

        {/* Social Links */}
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold mb-4'>Social Links</h2>
          <div className='flex space-y-4 flex-col'>
            <Link to='https://facebook.com' className='hover:text-gray-400'>Facebook</Link>
            <Link to='https://twitter.com' className='hover:text-gray-400'>Twitter</Link>
            <Link to='https://linkedin.com' className='hover:text-gray-400'>LinkedIn</Link>
            <Link to='https://instagram.com' className='hover:text-gray-400'>Instagram</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Footer from "./Footer";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Header from "./header";

const ContactUs = () => {
  return (
    <div>
      <Header/>
    <div className="w-full flex flex-col items-center justify-center bg-white ">
      <div className="w-full p-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Get in touch with us for more information
        </h2>
        <p className="text-center mb-4">
          If you have a question or need assistance, we are here to help.
        </p>

        <div className="mb-8 flex flex-col justify-center items-center">
          <h3 className="text-lg font-bold mb-2 text-center">Social Media</h3>
          <div className="space-y-2">
           <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <FaInstagram />
                    <p>Instagram:</p>
                </div>
                <a href="https://www.instagram.com/medscanafrica?igsh=Y2I3cG41OHBxODB0" className="text-blue-600">
                medscanafrica
                </a>
           </div>
           <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <FaXTwitter />
                    <p>X:</p>
                </div>
                <a href="https://x.com/medscanafrica?t=iDOew9FJCh1TZfawb-Al5Q&s=09" className="text-blue-600">
                medscanafrica
                </a>
           </div>
           <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <FaLinkedinIn />
                    <p>Linkedin:</p>
                </div>
                <a href=" https://www.linkedin.com/company/medscan-africa/" className="text-blue-600">
                medscanafrica
                </a>
           </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-center">Email Address</h3>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
                <MdOutlineEmail />
                <p>Email:</p>
            </div>
          <a className="text-blue-600">support@medscan.africa</a>
          </div>
         
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-center">Mobile Number</h3>
         <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
            <IoCallOutline />
            <p>Phone:</p>
            </div>
          <p className="text-blue-600">+1 (585) 626-9360</p>
         </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex flex-row-reverse items-center gap-1">
            Livechat
            <IoChatbubbleEllipsesOutline />
          </button>
        </div>
      </div>
      <div className="w-full  ">
        <Footer />
      </div>
    </div>
    </div>
  );
};

export default ContactUs;

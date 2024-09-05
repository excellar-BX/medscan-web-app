import React from "react";
import Footer from "./Footer";
import { PiAppleLogo } from "react-icons/pi";
import playstore from "../assets/images/playimg.png";
import bgnext from "../assets/images/Rectangle.png"

const AboutUs = () => {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center bg-gray-100">
      {/* Company Overview */}
      <h3 className="w-full lg:w-[60%] max-sm:w-[100%] max-md:w-[100%] text-center lg:text-[26px] p-10 mb-8">
        Medscan is a company that helps you know where your medicines, foods, and
        beverages come from. We track these products in real-time to ensure they are
        safe and genuine, working closely with manufacturers and regulators like NAFDAC.
        Our blockchain technology makes sure what you buy is exactly what you expect,
        giving you peace of mind with every purchase.
      </h3>
      
      {/* Mission Statement */}
      <div className="w-full mb-8 lg:h-[60vh] bg-center bg-cover bg-no-repeat text-white"  style={{
          backgroundImage: `url(${bgnext})`,
        }}>
          <div className="flex flex-col">
            <h3 className="lg:text-[26px] text-left px-10 p-10 items-center lg:w-3/4 w-[100%] max-sm:text-center mb-5">
              Our mission at Medscan is to safeguard public health by ensuring the
              authenticity and safety of drugs, food, and beverages. Through cutting-edge
              blockchain technology, we aim to create a transparent supply chain where every
              product can be traced from its origin to the consumer. By partnering with
              manufacturers, regulators, and distributors, we strive to eliminate counterfeit
              products, reduce risks, and empower consumers with the knowledge and confidence
              that what they consume is genuine and safe. We are committed to building a more
              secure, trustworthy, and efficient marketplace for everyone.
            </h3>
            
            {/* Download Buttons */}
            <div className="lg:flex md:flex max-md:flex space-x-4 mb-12 px-10 max-sm:flex-col">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 max-sm:mb-2">
                <img src={playstore} alt="play" className="h-6" />
                <p className="text-sm">
                    Get it on <br /> Google Playstore
                </p>
                </button>
                <button className="flex items-center space-x-2 bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800">
                <PiAppleLogo size={24} />
                <p className="text-sm">
                    Get it on <br /> Apple Store
                </p>
                </button>
            </div>
          </div>
      </div>
     
      

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;

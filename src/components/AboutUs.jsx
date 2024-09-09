import React from "react";
import Footer from "./Footer";
import { PiAppleLogo } from "react-icons/pi";
import playstore from "../assets/images/playimg.png";
import bgnext from "../assets/images/Rectangle.png"
import Header from "./header";

const AboutUs = () => {
  return (
    <div>
      <Header/>
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
      <div
  className="w-full min-h-[40vh] mb-8 bg-center bg-cover bg-no-repeat text-white flex items-center"
  style={{ backgroundImage: `url(${bgnext})` }}
>
  <div className="flex flex-col justify-center items-center w-full lg:py-10 py-6 ">
    <div className="lg:text-[19px] text-left lg:px-10 px-5 lg:w-3/4 w-full max-sm:text-center mb-8 leading-relaxed pt-6">
    <h3 className="pb-2 text-base md:text-lg lg:text-xl leading-tight">
  Our mission at Medscan is to safeguard public health by ensuring the authenticity and 
</h3>
<h3 className="pb-2 text-base md:text-lg lg:text-xl leading-tight">
  safety of drugs, food, and beverages. Through cutting-edge blockchain technology, we 
</h3>
<h3 className="pb-2 text-base md:text-lg lg:text-xl leading-tight">
  aim to create a transparent supply chain where every product can be traced from its 
</h3>
<h3 className="pb-2 text-base md:text-lg lg:text-xl leading-tight">
  origin to the consumer. By partnering with manufacturers, regulators, and distributors,
</h3>
<h3 className="pb-2 text-base md:text-lg lg:text-xl leading-tight">
  we strive to eliminate counterfeit products, reduce risks, and empower consumers with 
</h3>
<h3 className="pb-2 text-base md:text-lg lg:text-xl leading-tight">
  the knowledge and confidence that what they consume is genuine and safe. We are 
</h3>
<h3 className="text-base md:text-lg lg:text-xl leading-tight">
  committed to building a more secure, trustworthy, and efficient marketplace for everyone.
</h3>

    </div>

    {/* Download Buttons */}
    <div className="lg:flex md:flex max-md:flex flex-col lg:space-x-4 space-y-4 lg:space-y-0 mb-12 px-5 lg:px-0">
  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
    <img src={playstore} alt="play" className="h-6" />
    <p className="text-sm text-left">
      Get it on <br /> Google Playstore
    </p>
  </button>
  <button className="flex items-center space-x-2 bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800">
    <PiAppleLogo size={24} />
    <p className="text-sm text-left">
      Get it on <br /> Apple Store
    </p>
  </button>
</div>

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

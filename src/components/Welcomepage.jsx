import "../App.css";
import Footer from "./Footer";
import OurService from "./OurService";
import { Link } from "react-router-dom";
import bgImage from "../assets/images/Rectangle 2hero-img.png";
import bgImage2 from "../assets/images/Rectangle 18footer-img-1.png";
import google from "../assets/images/google.png";
import apple from "../assets/images/apple.png";
export default function Welcomepage() {
  return (
    <>
      <div className="w-full h-[421px]">
        <div className="relative h-full w-full">
          <div className="absolute top-0 right-0 bg-black w-full z-30 h-full">
            <img src={bgImage} className="h-full w-full object-cover" />
          </div>
          <div className=" text-white text-center mx-auto md:max-w-[1440px] relative z-40 h-full flex justify-center items-center flex-col">
            <h2 className="md:text-[28px] text-[20px] font-[600] py-5">
              SAFE PRODUCTS, SECURE FUTURE
            </h2>
            <p className="md:leading-[35px] leading-[18px] lg:w-[1178px] w-[90%] text-center lg:text-[22px] text-[16px] font-[600]">
              Forefront of transforming the supply chain landscape in Nigeria,
              focusing on the critical sectors of drugs, food and beverages.
              Leveraging advanced blockchain technology, we ensure the
              integrity,transparency and safety of products from production to
              consumption{" "}
            </p>
            <div className="py-6">
              <div className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]">
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OurService />

      <div className="w-full md:h-[421px]">
        <div className="relative h-full w-full md:p-16 p-6">
          <div className="absolute top-0 right-0 bg-black w-full z-30 h-full">
            <img src={bgImage2} className="h-full w-full" />
          </div>
          <div className="md:max-w-[1440px] w-full mx-auto">
            <div className=" text-white text-start md:w-[705px] relative z-30">
              <h2 className="lg:text-[20px] md:text-[16px] text-[14px] font-[600] py-5">
                At MedScan,we believe in the power of technology to create safer
                and more transparent supply chains. Join us in our mission to
                protect consumers and promote genuine products in Nigeria.
              </h2>
              <p className="font-[600] lg:text-[20px] md:text-[16px] text-[14px]">
                Download the MedScan App available on Android and iOS devices.
              </p>
              <div className="flex items-center gap-6 py-6">
                <img src={google} className="md:h-[55px] md:w-[177px] w-[85px] h-[27px]" />
                <img src={apple} className="md:h-[55px] md:w-[177px] w-[85px] h-[27px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

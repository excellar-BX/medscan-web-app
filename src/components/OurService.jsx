import { Link } from "react-router-dom";
import group1 from "../assets/images/Group 11.png";
import group2 from "../assets/images/Group 13.png";
import group3 from "../assets/images/Group 14.png";
import group4 from "../assets/images/Rectangle 12our-mission-img-1.png";
import group5 from "../assets/images/Rectangle 17our-miss-2.png";
import "../App.css";
export default function OurService() {
  return (
    <div className="">
      <div className="py-20 sm:px-40 px-10 bg-[#D8DADB59]">
        <h1 className="text-center  text-black font-[700]  text-[28px]">
          What We Do
        </h1>
        <div className="sm:flex-col max-w-[1440px] mx-auto py-12 flex-wrap md:justify-center gap-6 flex md:flex-row items-center">
          <div className="shadow-md p-10 w-[409px] rounded-[10px] h-[445px] bg-white">
            <img src={group1} alt="" />
            <h3 className="py-5 font-bold">Blockchain Technology</h3>
            <p className="text-lg">
              MedScan utilizes blockchain technology to create an immutable,
              tamper-proof record of every transaction in the supply chain.
            </p>
          </div>
          <div className="shadow-md p-10 w-[409px] rounded-[10px]  h-[445px] bg-white">
            <img src={group2} alt="" />
            <h3 className="py-5 font-bold">Real-Time Monitoring</h3>
            <p className="text-lg">
              Our platform provides real-time monitoring, smart contract
              automation and end-to-end traceability, making it easier to detect
              and eliminate counterfeit products.
            </p>
          </div>
          <div className="shadow-md p-10 w-[409px] rounded-[10px]  h-[445px] bg-white">
            <img src={group3} alt="" />
            <h3 className="py-5 font-bold">Permission Network</h3>
            <p className="text-lg">
              Grant access only to authorized personnel.
            </p>
          </div>
        </div>
      </div>

      <div className="flex relative lg:h-[900px] md:h-[600px] h-[500px] bg-white md:max-w-[1440px] w-[90%] justify-end items-center mx-auto py-10 md:flex-col flex-col-reverse">
        <img
          src={group4}
          alt=""
          className="lg:h-[295px] md:h-[200px] h-[110px] w-full object-cover rounded-[10px]"
        />

        <div className="flex w-full">
          <div>
            <div className="md:mt-10 text-xl font-bold md:text-start text-center">
              Our Mission
            </div>
            <p className="mt-2 text-[#1E1E1ECC] md:text-[20px] text-[9px] md:text-start text-center font-[500] md:leading-[30px] lg:w-[738px]">
              Our mission is to combat counterfeit products and enhance customer
              trust by providing a secure, transparent and efficient supply
              chain solution. We strive to safeguard public health and bolster
              the economy by ensuring that only genuine, high-quality products
              reach the market.
            </p>

            <div className="py-6  md:text-start text-center flex md:justify-start justify-center items-center">
              <div className="md:px-6 md:w-[155px] w-[80px] px-2 h-[30px] md:h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]">
                <span className="text-[10px] md:text-[16px]">Learn More</span>
              </div>
            </div>
          </div>

          <div className="absolute lg:top-[40%] md:top-[18%] top-[50%] lg:right-[10%] right-[5%]">
            <img
              className="lg:h-[454px] md:h-[200px] md:w-[150px] h-[150px] lg:w-[363px] w-[100px] object-cover rounded-[10px]"
              src={group5}
              alt="Mission Image"
            />
          </div>
        </div>
      </div>

      <div className="py-20 sm:px-40 px-10 bg-[#D8DADB59]">
        <h1 className="text-center  text-black font-[700]  text-[28px]">
          Why MedScan?
        </h1>
        <div className="sm:flex-col max-w-[1440px] mx-auto py-12 flex-wrap md:justify-center gap-6 flex md:flex-row items-center">
          <div className="shadow-md p-10 w-[409px] rounded-[10px] h-[445px] bg-white">
            <img src={group1} alt="" />
            <h3 className="py-5 font-bold">Partnerships</h3>
            <p className="text-lg">
              Designed specifically for the Nigerian market, addressing local
              challenges and opportunities.
            </p>
          </div>
          <div className="shadow-md p-10 w-[409px] rounded-[10px]  h-[445px] bg-white">
            <img src={group2} alt="" />
            <h3 className="py-5 font-bold">Real-Time Monitoring</h3>
            <p className="text-lg">
              Collaborating with key stakeholders, including local manufacturers
              and regulatory bodies to drive industry-wide change.
            </p>
          </div>
          <div className="shadow-md p-10 w-[409px] rounded-[10px]  h-[445px] bg-white">
            <img src={group3} alt="" />
            <h3 className="py-5 font-bold">Innovation</h3>
            <p className="text-lg">
              Continuously improving our technology to stay ahead of counterfeit
              threats and ensure the highest standards of product safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

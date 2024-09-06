import { useState } from "react";
import logi from "../assets/images/image 2.png";
import bgImage from "../assets/images/login-img.jpg";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function SignOption() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    navigate(`./${role}`); // Navigate to the selected role's path
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full h-full">
        <div className="relative h-full flex">
          <img
            src={bgImage}
            alt=""
            className="w-full absolute z-20 object-cover"
          />
          <div className="lg:w-[50%] w-0 flex justify-center items-center h-full relative z-40">
            <img src={logi} alt="" className="top-0 z-40 contrast-200 w-44" />
          </div>

          <div className="lg:w-[50%] w-full bg-white p-12 rounded-l-[10px] flex flex-col items-center h-full relative z-40">
            <h3 className="py-5 font-[800] text-[30px]">Create Account</h3>
            <p className="text-center md:text-[22px] md:w-[497px]">
              Kindly click on one of the categories below and provide all valid
              information as required.
            </p>
            <div className="flex md:flex-row flex-col justify-center md:gap-14 gap-12 lg:py-24 py-8 w-full">
              <button
                onClick={() => handleRoleSelection("Manufacturer")}
                className="py-16 px-10 font-[500] shadow-md rounded-[10px] hover:bg-[#0084FC] cursor-pointer hover:text-white"
              >
                Manufacturer
              </button>
              <button
                onClick={() => handleRoleSelection("Distributors")}
                className="py-16 px-10 font-[500] shadow-md rounded-[10px] hover:bg-[#0084FC] cursor-pointer hover:text-white"
              >
                Distributors
              </button>
              <button
                onClick={() => handleRoleSelection("Stores")}
                className="py-16 px-16 font-[500] shadow-md rounded-[10px] hover:bg-[#0084FC] cursor-pointer hover:text-white"
              >
                Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

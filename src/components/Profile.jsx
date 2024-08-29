import { useState, useEffect } from "react";
import axios from "axios";
import logi from "../assets/images/login-img.jpg";
import { useGetUserQuery } from "../Helper/Apis/UseFetch";
import { ErrorMessage, Field, Form } from "formik";
import { BiPencil } from "react-icons/bi";

export default function Profile() {
  const { data, isLoading } = useGetUserQuery();

  const [tabs, setTabs] = useState(1);

  console.log(data);

  return (
    <div className="p-6">
      <div className="w-full bg-white">
        <div className="h-[80px] text-[18px] flex gap-12 items-center px-6 w-full bg-[#5b81eb15]">
          <div
            className={`border-b-[2px] ${
              tabs == 1 && "border-blue-400"
            }  cursor-pointer py-3`}
            onClick={() => setTabs(1)}
          >
            <p>Basic Information</p>
          </div>

          <div
            className={`border-b-[2px] ${
              tabs == 2 && "border-blue-400"
            }  cursor-pointer py-3`}
            onClick={() => setTabs(2)}
          >
            <p>Business Information</p>
          </div>
        </div>

        <div className="min-h-[300px] p-12">
          {tabs == 1 && (
            <>
              <div className="flex justify-between h-full">
                <div className="bg-gray-100 rounded-[20px] shadow-sm p-6 h-[400px] font-[500] flex flex-col gap-6 w-[20%]">
                  <div
                    className={`text-blue-800 bg-[#9ebdff79] p-4 rounded-[50px]`}
                  >
                    <p>Profile</p>
                  </div>

                  <div className={`p-4 rounded-[50px]`}>
                    <p>Security Information</p>
                  </div>
                </div>
                <div className="w-[70%]">
                  <div className="w-[100px] h-[100px] rounded-full relative bg-gray-400">
                    <div className="absolute w-[30px] flex justify-center items-center h-[30px] bg-[#0084FC] rounded-full">
                      <BiPencil color="white" />
                    </div>
                  </div>
                  <div className="py-6 flex flex-row flex-wrap gap-[100px] w-full">
                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Full Name
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>

                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Phone Number
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>

                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Email Address
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>

                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Role
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex py-6">
                    <div className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]">
                      <span>Save Changes</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {tabs == 2 && (
            <>
              <div className="flex justify-between h-full">
                <div className="bg-gray-100 rounded-[20px] shadow-sm p-6 h-[400px] font-[500] flex flex-col gap-6 w-[20%]">
                  <div
                    className={`text-blue-800 bg-[#9ebdff79] p-4 rounded-[50px]`}
                  >
                    <p>Regulatory Compliance</p>
                  </div>

                  <div className={`p-4 rounded-[50px]`}>
                    <p>Contact Information</p>
                  </div>

                  <div className={`p-4 rounded-[50px]`}>
                    <p>Business Information</p>
                  </div>
                </div>
                <div className="w-[70%]">
                  <div className="py-6 flex flex-row flex-wrap gap-[100px] w-full">
                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Full Name
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>

                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Phone Number
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>

                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Email Address
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>

                    <div className="h-[60px] w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                        Role
                      </div>
                      <div
                        type="text"
                        name="fullName"
                        className="w-full bg-transparent h-full px-6 outline-none border-none"
                      />
                      <div>
                        <div
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex py-6">
                    <div className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]">
                      <span>Save Changes</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

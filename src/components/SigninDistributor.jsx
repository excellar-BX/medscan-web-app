import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logi from "../assets/images/image 2.png";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/login-img.jpg";
import { validationSchema } from "../Helper/Schema";
import { useLoginUserMutation } from "../Helper/Apis/UseMutate";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";

export default function SignInManufactur() {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage({});
    }, 7000);
  }, [message.error, message.success]);

  return (
    <div className="flex h-screen overflow-hidden">
      {message.error && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#ff3a3a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#ff7c7c]">
          <CgDanger size={30} />
          <p>{message.error}</p>
        </div>
      )}
      {message.success && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#1f8d5a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#24ca4e]">
          <BiCheckCircle size={30} />
          <p>{message.success}</p>
        </div>
      )}
      <div className="w-full h-full">
        <div className="relative h-full flex">
          <img
            src={bgImage}
            alt=""
            className="w-full absolute z-20 object-cover"
          />
          <div className="lg:w-[100%] w-0 flex justify-center items-center h-full relative z-40">
            <img src={logi} alt="" className="top-0 z-40 contrast-200 w-44" />
          </div>

          <div className="lg:w-[40%] w-full bg-white overflow-y-auto md:p-12 p-4 pt-12 rounded-l-[10px] items-center flex flex-col h-full relative z-40">
            <h3 className="font-[800] text-[30px]">Welcome Back!!</h3>
            <p className="md:text-[16px] text-center">
              You are logging in as a Distributor
            </p>
            {/* Form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await loginUser(values)
                    .unwrap()
                    .then((data) => {
                      setMessage({
                        success: "Login Successfully",
                        error: "",
                      });
                      localStorage.setItem("token", data?.token);
                      setTimeout(() => {
                        navigate("/dashboard");
                      }, 3000);
                    });
                } catch (error) {
                  setMessage({ success: "", error: error?.data?.message });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="py-10 flex flex-col gap-[70px] w-[100%]">
                  <div className="h-[60px] w-[100%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                    <div className="p-2 absolute -top-5 left-3 bg-white text-[14px]">
                      Email Address
                    </div>
                    <Field
                      name="email"
                      type="email"
                      className="w-full bg-transparent h-full px-6 outline-none border-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                    />
                  </div>

                  <div className="h-[60px] w-[100%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                    <div className="p-2 absolute -top-5 left-3 bg-white text-[14px]">
                      Password
                    </div>
                    <Field
                      name="password"
                      type="password"
                      className="w-full bg-transparent h-full px-6 outline-none border-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                    />
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-[14px] items-center">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="border-[1px] border-[#494949] w-[20px] h-[20px]"
                        />
                        <p>Remember me</p>
                      </div>
                      <span className="text-[#0084FC] cursor-pointer">
                        Forget Password
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]"
                    >
                      {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                    <div className="flex justify-center text-[14px] items-center">
                      <p>
                        Don’t have an account?{" "}
                        <span className="text-[#0084FC] cursor-pointer">
                          Register
                        </span>
                      </p>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

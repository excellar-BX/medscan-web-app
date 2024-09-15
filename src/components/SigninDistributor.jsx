import { Formik, Field, Form, ErrorMessage } from "formik";
import logi from "../assets/images/image 2.png";
import { useNavigate, useParams } from "react-router-dom";
import bgImage from "../assets/images/login-img.jpg";
import { validationSchema } from "../Helper/Schema";
import { useLoginUserMutation } from "../Helper/Apis/UseMutate";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { useAuth } from "../Helper/AuthContext";

export default function SignInManufactur() {
  const navigate = useNavigate();
  const { type } = useParams(); // Get the user role type from the URL params
  const { setRole } = useAuth(); // Set role in AuthContext
  const [loginUser] = useLoginUserMutation();
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  // Set timeout to clear error/success messages
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({
        success: "",
        error: "",
      });
    }, 7000);
    return () => clearTimeout(timer);
  }, [message.error, message.success]);

  // Store role in AuthContext and localStorage
  useEffect(() => {
    if (type) {
      setRole(type); // Set the role in AuthContext
      localStorage.setItem("role", type); // Store the role in localStorage for future use
    } else {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole || "Manufacturer"); // Set a default role if none exists
    }
  }, [type, setRole]);

  // Get the role for display
  const roleToDisplay = type || localStorage.getItem("role") || "Manufacturer";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Display error message */}
      {message.error && (
        <div className="fixed animate-slideIn top-0 font-semibold gap-6 z-50 border-b-[5px] border-red-500 flex items-center rounded-b-lg w-full p-4 text-white min-h-[80px] bg-red-400">
          <CgDanger size={30} />
          <p>{message.error}</p>
        </div>
      )}
  
      {/* Display success message */}
      {message.success && (
        <div className="fixed animate-slideIn top-0 font-semibold gap-6 z-50 border-b-[5px] border-green-600 flex items-center rounded-b-lg w-full p-4 text-white min-h-[80px] bg-green-500">
          <BiCheckCircle size={30} />
          <p>{message.success}</p>
        </div>
      )}
  
      <div className="w-full h-full">
        <div className="relative h-full flex flex-col lg:flex-row">
          {/* Background Image */}
          <div
            className="lg:w-[800px] w-full h-[200px] lg:h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
  
          {/* Login Form */}
          <div className="lg:w-[40%] w-full bg-white overflow-y-auto md:p-12 p-4 pt-12 rounded items-center flex flex-col h-full relative z-40">
            {/* Logo */}
            <div className="relative z-50">
              <img
                src={logi}
                alt=""
                className="lg:w-[300px] w-[200px] mx-auto mb-8"
              />
            </div>
  
            {/* Welcome Message */}
            <h3 className="font-extrabold text-[30px]">Welcome</h3>
            <p className="md:text-[16px] text-center mb-5">
              You are signing in as a {roleToDisplay}
            </p>
  
            {/* Formik Form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const loginData = {
                    ...values,
                    role: localStorage.getItem("role") || "Manufacturer",
                  };
                  const userData = await loginUser(loginData).unwrap();
                  localStorage.setItem("token", userData.token);
                  navigate("/dashboard");
                } catch (error) {
                  setMessage({
                    success: "",
                    error: error?.data?.message || "An unknown error occurred",
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 w-full">
                  {/* Email Field */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 bg-transparent border-none outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
  
                  {/* Password Field */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 bg-transparent border-none outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-400 text-white py-4 rounded-lg hover:bg-green-400 transition-all ease-in-out duration-300"
                  >
                    {isSubmitting ? "Submitting..." : "Sign In"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

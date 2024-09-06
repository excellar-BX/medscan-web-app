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
      setMessage({});
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Display error message */}
      {message.error && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#ff3a3a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#ff7c7c]">
          <CgDanger size={30} />
          <p>{message.error}</p>
        </div>
      )}

      {/* Display success message */}
      {message.success && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#1f8d5a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#24ca4e]">
          <BiCheckCircle size={30} />
          <p>{message.success}</p>
        </div>
      )}

      <div className="w-full h-full">
        <div className="relative h-full flex">
          {/* Background Image */}
          <div
            className="w-[800px] h-full bg-cover bg-center"
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
            <h3 className="font-[800] text-[30px]">Welcome</h3>
            <p className="md:text-[16px] text-center mb-5">
              You are signing in as a {type ? type : localStorage.getItem("role")}
            </p>

            {/* Formik Form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  // Pass role as part of login data
                  const loginData = {
                    ...values,
                    role: localStorage.getItem("role") || "Manufacturer", // Attach role to the login request
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
                    className="w-full bg-red-500 text-white py-2 rounded-lg"
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

import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useCreateUserMutation } from "../Helper/Apis/UseMutate";
import PhoneNumberInput from "./phoneNumber";

const LocalSignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  agreeToTerms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

export default function LogDistributor() {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [message, setMessage] = useState({ success: "", error: "" });
  const { type } = useParams(); // Role type from URL params

  useEffect(() => {
    const timer = setTimeout(() => setMessage({}), 8000);
    return () => clearTimeout(timer);
  }, [message.error, message.success]);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value); 
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {message.error && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#ff3a3a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#ff7c7c]">
          <p>{message.error}</p>
        </div>
      )}
      {message.success && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#1f8d5a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#24ca4e]">
          <p>{message.success}</p>
        </div>
      )}
      <div className="w-full h-full">
        <div className="relative h-full flex">
          <div
            className="w-[800px] h-[full] bg-cover bg-center"
            style={{ backgroundImage: "url('http://localhost:5173/src/assets/images/login-img.jpg')" }}
          >
            {/* <img src={require("../assets/images/image 2.png")} alt="login" className="w-full h-full" /> */}
          </div>

          <div className="lg:w-[40%] w-full bg-white overflow-y-auto md:p-12 p-4 pt-12 rounded items-center flex flex-col h-full relative z-40">
            <h3 className="font-[800] text-[30px]">Create Account</h3>
            <p className="md:text-[16px] text-center mb-5">
              You are creating an account as a {type ? type : "distributor"}
            </p>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                agreeToTerms: false,
              }}
              validationSchema={LocalSignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const data = await createUser({ ...values, role: type }).unwrap();
                  setMessage({ success: "Account created successfully", error: "" });
                  localStorage.setItem("token", data.token);
                  navigate("/login");
                } catch (error) {
                  setMessage({ success: "", error: error.data.message });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 w-full">
                  {/* Full Name */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Full Name
                    </label>
                    <Field
                      name="fullName"
                      className="w-full px-4 py-2 bg-transparent border-none outline-none"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

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

                  <div className="relative border border-gray-300 rounded-lg">
                    <PhoneNumberInput name="phone" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Password */}
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

                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="w-full px-4 py-2 bg-transparent border-none outline-none"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Agree to Terms */}
                  <div className="flex items-center space-x-2">
                    <Field type="checkbox" name="agreeToTerms" className="w-4 h-4" />
                    <label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the terms and conditions
                    </label>
                    <ErrorMessage
                      name="agreeToTerms"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-500 text-white py-2 rounded-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Create Account"}
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

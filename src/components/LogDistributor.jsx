import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupSchema } from '../Helper/Schema';
import PhoneNumberInput from './phoneNumber';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import logi from "../assets/images/image 2.png";
import bgImage from "../assets/images/login-img.jpg";
import { CgDanger } from 'react-icons/cg';
import { BiCheckCircle } from 'react-icons/bi';
import { useCreateUserMutation } from '../Helper/Apis/UseMutate';
import { useAuth } from '../Helper/AuthContext';
import { countriesStates } from './country';

const LogDistributor = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { setRole } = useAuth();
  const [createUser] = useCreateUserMutation();
  const [message, setMessage] = useState({ success: "", error: "" });

  const [countryValue, setCountryValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [states, setStates] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(""); 

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    const timer = setTimeout(() => setMessage({}), 8000);
    return () => clearTimeout(timer);
  }, [message.error, message.success]);

  useEffect(() => {
    setStates(countriesStates[countryValue] || []);
    setStateValue(""); // Reset state when country changes
  }, [countryValue]);

  const handleCountryChange = (event) => {
    setCountryValue(event.target.value);
  };

  const handleStateChange = (event) => {
    setStateValue(event.target.value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value); 
  };

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
          <div className="w-[800px] h-[full] bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <img src={logi} alt="login" className="w-full h-full" />
          </div>

          <div className="lg:w-[40%] w-full bg-white overflow-y-auto md:p-12 p-4 pt-12 rounded items-center flex flex-col h-full relative z-40">
            <h3 className="font-[800] text-[30px]">Create Account</h3>
            <p className="md:text-[16px] text-center mb-5">
              You are creating an account as a {role ? role : "distributor"}
            </p>

            <Formik
              initialValues={{ fullName: "", email: "", companyName: "", phone: "", password: "", confirmPassword: "", agreeToTerms: false }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const data = await createUser({ ...values, role, country: countryValue, state: stateValue }).unwrap();
                  setMessage({ success: "Account created successfully", error: "" });
                  setRole(role);
                  localStorage.setItem("token", data?.token);
                  navigate("/login");
                } catch (error) {
                  setMessage({ success: "", error: error?.data?.message || "Failed to create account" });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">Full Name</label>
                    <Field name="fullName" className="w-full px-4 py-2 bg-transparent border-none outline-none" />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">Email</label>
                    <Field type="email" name="email" className="w-full px-4 py-2 bg-transparent border-none outline-none" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="relative border border-gray-300 rounded-lg">
                    <Field name="phone" component={PhoneNumberInput} value={phoneNumber} onChange={handlePhoneNumberChange} />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
                  </div>
                  
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">Company Name</label>
                    <Field name="companyName" className="w-full px-4 py-2 bg-transparent border-none outline-none" />
                    <ErrorMessage name="companyName" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-black text-gray-500 text-sm px-1 -translate-y-1/2">Country</label>
                    <Field as="select" name="country" value={countryValue} onChange={handleCountryChange} className="w-full px-4 py-2 bg-transparent border-none outline-none">
                      <option value="">Select Country</option>
                      {Object.keys(countriesStates).map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-black text-gray-500 text-sm px-1 -translate-y-1/2">State</label>
                    <Field as="select" name="state" value={stateValue} onChange={handleStateChange} className="w-full px-4 py-2 bg-transparent border-none outline-none" disabled={!countryValue}>
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">Password</label>
                    <Field type={showPassword ? "text" : "password"} name="password" className="w-full px-4 py-2" />
                    <div className="absolute right-2 top-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                      {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">Confirm Password</label>
                    <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="w-full px-4 py-2" />
                    <div className="absolute right-2 top-1/2 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Field type="checkbox" name="agreeToTerms" />
                    <label>I agree to the terms and conditions</label>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-500 text-white rounded-lg">
                    Create Account
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogDistributor;

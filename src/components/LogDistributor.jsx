import { useNavigate } from "react-router-dom";
import axios from "axios";
import logi from "../assets/images/image 2.png";
import bgImage from "../assets/images/login-img.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "../Helper/Schema";
import { useCreateUserMutation } from "../Helper/Apis/UseMutate";

export default function LogDistributor() {
  const [createUser] = useCreateUserMutation();

  return (
    <div className="flex h-screen overflow-hidden">
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

          <div className="lg:w-[40%] w-full bg-white overflow-y-auto md:p-12 p-4 pt-12 rounded-l-[10px] items-center flex flex-col  h-full relative z-40">
            <h3 className="font-[800] text-[30px]">Create Account</h3>
            <p className="md:text-[16px] text-center">
              You are creating an account as a Distributor
            </p>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phone: "",
                password: "",
                agreeToTerms: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await createUser(values).unwrap();
                  alert("Account created successfully");
                } catch (error) {
                  alert("Failed to create account");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="py-10 flex flex-col gap-[60px] w-[100%]">
                  <div className="h-[60px] w-[100%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                    <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                      Full Name
                    </div>
                    <Field
                      type="text"
                      name="fullName"
                      className="w-full bg-transparent h-full px-6 outline-none border-none"
                    />
                    <div>
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                      />
                    </div>
                  </div>

                  <div className="h-[60px] w-[100%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                    <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                      Email Address
                    </div>
                    <Field
                      type="email"
                      name="email"
                      className="w-full bg-transparent h-full px-6 outline-none border-none"
                    />
                    <div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm border-l-4  border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="h-[60px] w-[100%] flex relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                      <div className="bg-gray-100 w-[20%] rounded-l-[8px] h-full flex justify-center items-center">
                        <span className="font-[500]">+234</span>
                      </div>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Enter your phone Number"
                        className="w-[80%] h-full px-4 outline-none border-none"
                        inputMode="numeric"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                      />
                    </div>
                  </div>

                  <div className="h-[60px] w-[100%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                    <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                      Company Name
                    </div>
                    <Field
                      type="text"
                      name="companyName"
                      className="w-full bg-transparent h-full px-6 outline-none border-none"
                    />
                    <div>
                      <ErrorMessage
                        name="companyName"
                        component="div"
                        className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                      />
                    </div>
                  </div>

                  <div className="h-[60px] w-[100%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                    <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                      Password
                    </div>
                    <Field
                      type="password"
                      name="password"
                      className="w-full bg-transparent h-full px-6 outline-none border-none"
                    />
                    <div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                      />
                    </div>
                  </div>

                  <div className="h-[60px] w-[100%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                    <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                      Confirm Password
                    </div>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="w-full bg-transparent h-full px-6 outline-none border-none"
                    />
                    <div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 font-[500] text-[14px] items-center">
                      <Field
                        type="checkbox"
                        name="agreeToTerms"
                        className="border-[1px] border-[#494949] w-[20px] h-[20px]"
                      />
                      <p>
                        I agree to the{" "}
                        <span className="text-[#0084FC]">Terms of Service</span>{" "}
                        and{" "}
                        <span className="text-[#0084FC]">Privacy Policy</span>
                      </p>
                    </div>

                    <div>
                      <ErrorMessage
                        name="agreeToTerms"
                        component="div"
                        className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 h-[55px] text-white flex justify-center font-[500] items-center rounded-[5px] bg-[#0084FC]"
                    >
                      {isSubmitting ? "Submitting..." : "Create Account"}
                    </button>
                    <div className="flex justify-center text-[14px] font-[500] items-center">
                      <p>
                        Already have an account?{" "}
                        <span className="text-[#0084FC]">Log in</span>
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

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGetKycQuery, useGetUserQuery } from "../Helper/Apis/UseFetch";
import { BiPencil } from "react-icons/bi";
import { ProfileSchema } from "../Helper/Schema";
import {
  useUpdateKycMutation,
  useUpdateProfileMutation,
} from "../Helper/Apis/UseMutate";

export default function Profile() {
  const { data, isLoading } = useGetUserQuery();
  const { data: kyc } = useGetKycQuery();

  const [updateProfile, { isLoading: loading }] = useUpdateProfileMutation();

  const [updateKyc] = useUpdateKycMutation();

  const [tabs, setTabs] = useState(1);
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage({});
    }, 5000);
  }, [message.error, message.success]);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (values) => {
    await updateProfile(values)
      .unwrap()
      .then((data) => {
        setMessage({
          error : "",
          success : data?.message
        });
      })
      .catch((err) => {
        setMessage({
          error : "",
          success : err?.message
        });
      });
  };

  const handleSubmitKyc = async (values) => {
    await updateKyc(values)
      .unwrap()
      .then((data) => {
        setMessage({
          error : "",
          success : data?.message
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-6">
      {message.error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 flex justify-between items-center px-6">
          <p>
            <b>Error!!</b> , {message.error}
          </p>
          <div
            className="bg-white rounded-[8px] font-[500] hover:text-white hover:bg-red-300 cursor-pointer text-red-700 p-2 px-8"
            onClick={() => setMessage({ success: "", error: "" })}
          >
            Close
          </div>
        </div>
      )}

      {message.success && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4 flex justify-between items-center px-6">
          <p>
            <b>Success!!</b> , {message.success}
          </p>
          <div
            className="bg-white rounded-[8px] font-[500] hover:text-white hover:bg-green-300 cursor-pointer text-green-700 p-2 px-8"
            onClick={() => setMessage({ success: "", error: "" })}
          >
            Close
          </div>
        </div>
      )}

      <div className="w-full bg-white">
        <div className="h-[80px] text-[14px] md:text-[18px] flex gap-4 md:gap-12 items-center px-4 md:px-6 w-full bg-[#5b81eb15]">
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
            <p>
              Kyc{" "}
              {!data?.is_kyc_verified && (
                <span className="bg-red-100 rounded-[8px] text-[14px] font-[500] text-red-700 p-1 px-6">
                  Verify Kyc Here
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="min-h-[300px] p-4 md:p-12">
          {tabs == 1 && (
            <div className="flex flex-col md:flex-row justify-between h-full">
              <div className="bg-gray-100 rounded-[20px] shadow-sm p-6 h-auto md:h-[400px] font-[500] flex flex-col gap-6 w-full md:w-[20%]">
                <div
                  className={`text-blue-800 bg-[#9ebdff79] p-4 rounded-[50px]`}
                >
                  <p>Profile</p>
                </div>
              </div>

              <Formik
                initialValues={{
                  fullName: data?.fullName || "",
                  phone: data?.phone || "",
                  email: data?.email || "",
                  role: data?.role || "",
                }}
                validationSchema={ProfileSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form className="w-full md:w-[70%] mt-6 md:mt-0">
                    <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full relative bg-gray-400 mx-auto md:mx-0">
                      {data?.image ? (
                        <span className="font-[800]">
                          {data?.fullName.charAt(0)}
                        </span>
                      ) : (
                        <img
                          src={
                            preview ||
                            "data:image/png;base64,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"
                          } // Replace 'placeholder-image-url' with your placeholder image URL
                          alt="Profile Preview"
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="imageUpload"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="imageUpload"
                        className="absolute w-[30px] flex justify-center items-center h-[30px] bg-[#0084FC] rounded-full cursor-pointer"
                        style={{ bottom: 0, right: 0 }}
                      >
                        <BiPencil color="white" />
                      </label>
                    </div>

                    <div className="py-6 flex flex-col md:flex-row flex-wrap gap-[60px] md:gap-[100px] w-full">
                      <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                        <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                          Full Name
                        </div>
                        <Field
                          type="text"
                          name="fullName"
                          className="w-full bg-transparent h-full px-6 outline-none border-none"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>

                      <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                        <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                          Phone Number
                        </div>
                        <Field
                          type="text"
                          name="phone"
                          className="w-full bg-transparent h-full px-6 outline-none border-none"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>

                      <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] border-[#f1f1f1] bg-[#f1f1f1] rounded-[8px]">
                        <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                          Email Address
                        </div>
                        <Field
                          type="text"
                          name="email"
                          readOnly
                          className="w-full bg-transparent h-full px-6 outline-none border-none"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>

                      <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] bg-[#f1f1f1] border-[#f1f1f1] rounded-[8px]">
                        <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                          Role
                        </div>
                        <Field
                          type="text"
                          name="role"
                          readOnly
                          className="w-full bg-transparent h-full px-6 outline-none border-none"
                        />
                        <ErrorMessage
                          name="role"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center md:justify-start py-6">
                      <button
                        type="submit"
                        className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]"
                      >
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}

          {tabs == 2 && (
            <div className="flex flex-col md:flex-row justify-between h-full">
              <div className="bg-gray-100 rounded-[20px] shadow-sm p-6 h-auto md:h-[400px] font-[500] flex flex-col gap-6 w-full md:w-[20%]">
                <div
                  className={`text-blue-800 bg-[#9ebdff79] p-4 rounded-[50px]`}
                >
                  <p>Business Information</p>
                </div>
                <div className={`p-4 rounded-[50px]`}>
                  <p>Regulatory Compliance</p>
                </div>
                <div className={`p-4 rounded-[50px]`}>
                  <p>Contact Information</p>
                </div>
              </div>

              <div className="w-full md:w-[70%] mt-6 md:mt-0">
                <Formik
                  initialValues={{
                    businessName: kyc?.profile?.businessName || "",
                    businessLocation: kyc?.profile?.businessLocation || "",
                    businessRegistrationNumber:
                      kyc?.profile?.businessRegistrationNumber || "",
                  }}
                  onSubmit={handleSubmitKyc}
                >
                  {({ setFieldValue }) => (
                    <Form className="w-full md:w-[70%] mt-6 md:mt-0">
                      <div className="py-6 flex flex-col md:flex-row flex-wrap gap-[60px] md:gap-[100px] w-full">
                        <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                          <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                            Business Name
                          </div>
                          <Field
                            type="text"
                            name="businessName"
                            className="w-full bg-transparent h-full px-6 outline-none border-none"
                          />
                          <ErrorMessage
                            name="businessName"
                            component="div"
                            className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                          />
                        </div>

                        <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                          <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                            Business Location
                          </div>
                          <Field
                            type="text"
                            name="businessLocation"
                            className="w-full bg-transparent h-full px-6 outline-none border-none"
                          />
                          <ErrorMessage
                            name="businessLocation"
                            component="div"
                            className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                          />
                        </div>

                        <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] border-[#f1f1f1] rounded-[8px]">
                          <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                            Business Registration Number
                          </div>
                          <Field
                            type="text"
                            name="businessRegistrationNumber"
                            className="w-full bg-transparent h-full px-6 outline-none border-none"
                          />
                          <ErrorMessage
                            name="businessRegistrationNumber"
                            component="div"
                            className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                          />
                        </div>

                        {/* <div className="h-[60px] w-full md:w-[40%] relative border-[0.6px] bg-[#f1f1f1] rounded-[8px]">
                        <div className="p-2 absolute font-[500] -top-5 left-3 bg-white text-[14px]">
                         CAC Cert Image
                        </div>
                        <Field
                          type="text"
                          name="cacCertImage"
                          readOnly
                          className="w-full bg-transparent h-full px-6 outline-none border-none"
                        />
                        <ErrorMessage
                          name="cacCertImage"
                          component="div"
                          className="text-red-500 text-sm border-l-4 mt-3 border-[#e93b3b] px-4 bg-red-100 h-[30px] rounded flex justify-between items-center"
                        />
                      </div> */}
                      </div>

                      <div className="flex justify-center md:justify-start py-6">
                        <button
                          type="submit"
                          className="px-6 h-[55px] text-white flex justify-center items-center rounded-[5px] bg-[#0084FC]"
                        >
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

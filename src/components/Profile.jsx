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
  // Fetch logged-in user details
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
    // Clear messages after 5 seconds
    setTimeout(() => {
      setMessage({});
    }, 5000);
  }, [message.error, message.success]);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle image change
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

  // Handle profile update submission
  const handleSubmit = async (values) => {
    await updateProfile(values)
      .unwrap()
      .then((data) => {
        setMessage({
          error: "",
          success: data?.message,
        });
      })
      .catch((err) => {
        setMessage({
          error: err?.message,
          success: "",
        });
      });
  };

  // Handle KYC submission
  const handleSubmitKyc = async (values) => {
    await updateKyc(values)
      .unwrap()
      .then((data) => {
        setMessage({
          error: "",
          success: data?.message,
        });
      })
      .catch((err) => {
        setMessage({
          error: err?.message,
          success: "",
        });
      });
  };

  return (
    <div className="p-6">
      {/* Error Message */}
      {message.error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 flex flex-col md:flex-row justify-between items-center px-6">
          <p>
            <b>Error!!</b> , {message.error}
          </p>
          <div
            className="bg-white rounded-lg font-medium hover:text-white hover:bg-red-300 cursor-pointer text-red-700 p-2 px-4 md:px-8"
            onClick={() => setMessage({ success: "", error: "" })}
          >
            Close
          </div>
        </div>
      )}
  
      {/* Success Message */}
      {message.success && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4 flex flex-col md:flex-row justify-between items-center px-6">
          <p>
            <b>Success!!</b> , {message.success}
          </p>
          <div
            className="bg-white rounded-lg font-medium hover:text-white hover:bg-green-300 cursor-pointer text-green-700 p-2 px-4 md:px-8"
            onClick={() => setMessage({ success: "", error: "" })}
          >
            Close
          </div>
        </div>
      )}
  
      {/* Tabs for Basic Info and KYC */}
      <div className="w-full bg-white">
        <div className="h-20 text-sm md:text-base flex flex-col md:flex-row gap-4 md:gap-8 items-center px-4 md:px-6 w-full bg-[#5b81eb15]">
          <div
            className={`border-b-2 ${tabs === 1 ? "border-blue-400" : "border-transparent"} cursor-pointer py-3`}
            onClick={() => setTabs(1)}
          >
            <p>Basic Information</p>
          </div>
  
          <div
            className={`border-b-2 ${tabs === 2 ? "border-blue-400" : "border-transparent"} cursor-pointer py-3`}
            onClick={() => setTabs(2)}
          >
            <p>
              KYC{" "}
              {!data?.is_kyc_verified && (
                <span className="bg-red-100 rounded-lg text-xs font-medium text-red-700 p-1 px-4 md:px-6">
                  Verify KYC Here
                </span>
              )}
            </p>
          </div>
        </div>
  
        {/* Content for each Tab */}
        <div className="min-h-[300px] p-4 md:p-12">
          {tabs === 1 && (
            <div className="flex flex-col md:flex-row justify-between h-full">
              <div className="bg-gray-100 rounded-lg shadow-sm p-6 h-auto md:h-[400px] font-medium flex flex-col gap-6 w-full md:w-1/5">
                <div className="text-blue-800 bg-[#9ebdff79] p-4 rounded-full">
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
                  <Form className="w-full md:w-3/4 mt-6 md:mt-0">
                    {/* Profile Image */}
                    <div className="w-24 h-24 flex justify-center items-center rounded-full bg-gray-400 mx-auto md:mx-0">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full rounded-full object-cover" />
                      ) : data?.image ? (
                        <img src={data.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="font-bold">{data?.fullName.charAt(0)}</span>
                      )}
                    </div>
  
                    {/* Form Fields */}
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Full Name</label>
                      <Field
                        name="fullName"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter full name"
                      />
                      <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
  
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Phone</label>
                      <Field
                        name="phone"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter phone number"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
  
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter email address"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
  
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Role</label>
                      <Field
                        name="role"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter role"
                      />
                      <ErrorMessage name="role" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
  
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
  
          {tabs === 2 && (
            <Formik
              initialValues={{
                companyName: kyc?.companyName || "",
                vat: kyc?.vat || "",
                cac: kyc?.cac || "",
                tax: kyc?.tax || "",
                nin: kyc?.nin || "",
              }}
              validationSchema={ProfileSchema}
              onSubmit={handleSubmitKyc}
            >
              <Form className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <Field
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="companyName" component="div" className="text-red-500 text-xs mt-1" />
                </div>
  
                <div>
                  <label htmlFor="vat" className="block text-sm font-medium text-gray-700">
                    VAT Number
                  </label>
                  <Field
                    id="vat"
                    name="vat"
                    placeholder="Enter VAT number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="vat" component="div" className="text-red-500 text-xs mt-1" />
                </div>
  
                <div>
                  <label htmlFor="cac" className="block text-sm font-medium text-gray-700">
                    CAC Registration
                  </label>
                  <Field
                    id="cac"
                    name="cac"
                    placeholder="Enter CAC registration"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="cac" component="div" className="text-red-500 text-xs mt-1" />
                </div>
  
                <div>
                  <label htmlFor="tax" className="block text-sm font-medium text-gray-700">
                    Tax Number
                  </label>
                  <Field
                    id="tax"
                    name="tax"
                    placeholder="Enter tax number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="tax" component="div" className="text-red-500 text-xs mt-1" />
                </div>
  
                <div>
                  <label htmlFor="nin" className="block text-sm font-medium text-gray-700">
                    NIN
                  </label>
                  <Field
                    id="nin"
                    name="nin"
                    placeholder="Enter NIN"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="nin" component="div" className="text-red-500 text-xs mt-1" />
                </div>
  
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update KYC"}
                </button>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
  
}

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useCreateUserMutation } from '../Helper/Apis/UseMutate';
import PhoneNumberInput from './phoneNumber';
import logi from "../assets/images/image 2.png";
import bgImage from "../assets/images/login-img.jpg";

const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
    'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
    'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China',
    'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba',
    'Cyprus', 'Czech Republic', 'Democratic Republic of Congo', 'Denmark', 'Djibouti', 'Dominica',
    'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
    'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
    'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
    'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea',
    'South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
    'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
    'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
    'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
    'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
    'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
    'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
    'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
    'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden',
    'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
    'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe'
  ];

const LocalSignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  businessName: Yup.string().required('Business Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  countryOfOrigin: Yup.string().required('Country of origin is required'),
  businessDateOfEstab: Yup.string().required('Business Date is required'),
  businessLocation: Yup.string().required('Business Location is required'),
  registrationId: Yup.string().required('Registration ID is required'),
  licenseType: Yup.string().required('License Type is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  agreeToTerms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

export default function LogDistributor() {
  const navigate = useNavigate();
  const [createUser, { isLoading: isCreating, error: apiError }] = useCreateUserMutation();
  const [message, setMessage] = useState({ success: '', error: '' });
  const { type } = useParams(); // Role type from URL params

  useEffect(() => {
    if (message.error || message.success) {
      const timer = setTimeout(() => setMessage({ success: '', error: '' }), 8000);
      return () => clearTimeout(timer);
    }
  }, [message.error, message.success]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Success/Error Messages */}
      {message.error && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#ff3a3a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#ff7c7c]">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>{message.error}</p>
        </div>
      )}
      
      {message.success && (
        <div className="fixed animate-slideIn top-0 font-[600] gap-6 z-50 border-b-[5px] border-[#1f8d5a] flex items-center rounded-b-[5px] w-full p-4 text-white min-h-[80px] bg-[#24ca4e]">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p>{message.success}</p>
        </div>
      )}

      {/* API Error Display */}
      {apiError && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {apiError.data?.message || 'Something went wrong'}
          </div>
        </div>
      )}

      <div className="w-full h-full">
        <div className="relative h-full flex flex-col lg:flex-row">
          {/* Background image */}
          <img
            src={bgImage}
            alt="background"
            className="w-full h-full absolute top-0 left-0 z-10 object-cover"
          />

          {/* Logo Section */}
          <div className="lg:w-[50%] w-full flex justify-center items-center h-full relative z-20 lg:z-40">
            <img src={logi} alt="logo" className="contrast-200 w-44" />
          </div>

          {/* Form Section */}
          <div className="lg:w-[50%] w-full bg-white overflow-y-auto md:p-12 p-4 pt-12 flex flex-col items-center h-full relative z-40">
            <h3 className="font-[800] text-[30px]">Create Account</h3>
            <p className="md:text-[16px] text-center mb-5">
              You are creating an account as a {type ? type : 'Distributors'}
            </p>

            <Formik
              initialValues={{
                fullName: '',
                businessName: '',
                email: '',
                phone: '',
                businessDateOfEstab: '',
                businessLocation: '',
                registrationId: '',
                password: '',
                countryOfOrigin: '',
                confirmPassword: '',
                licenseType: '',
                certifications: [],
                agreeToTerms: false,
              }}
              validationSchema={LocalSignupSchema}
              onSubmit={async (values, { setSubmitting, setFieldError }) => {
                try {
                  // Clear previous messages
                  setMessage({ success: '', error: '' });
                  
                  // Call the createUser mutation
                  const response = await createUser({
                    ...values,
                    role: type || 'Distributors',
                  }).unwrap();

                  // Handle successful registration
                  console.log('Registration successful:', response);
                  setMessage({ 
                    success: 'Account created successfully! Redirecting...', 
                    error: '' 
                  });

                  // Store token if provided
                  if (response.token) {
                    localStorage.setItem('token', response.token);
                    
                    // Redirect after short delay to show success message
                    setTimeout(() => {
                      navigate(`/login/${type || 'Distributors'}`);
                    }, 1500);
                  } else {
                    setMessage({ 
                      success: '', 
                      error: 'Registration successful but no token received' 
                    });
                  }

                } catch (error) {
                  console.error('Registration failed:', error);
                  
                  // Handle different types of errors
                  if (error.status === 400) {
                    // Bad request - likely validation errors
                    if (error.data?.field) {
                      // Set field-specific errors
                      setFieldError(error.data.field, error.data.message);
                    } else {
                      setMessage({ 
                        success: '', 
                        error: error.data?.message || 'Invalid data provided' 
                      });
                    }
                  } else if (error.status === 409) {
                    // Conflict - user already exists
                    setMessage({ 
                      success: '', 
                      error: 'An account with this email already exists' 
                    });
                  } else if (error.status === 500) {
                    // Server error
                    setMessage({ 
                      success: '', 
                      error: 'Server error. Please try again later.' 
                    });
                  } else {
                    // Generic error
                    const errorMessage = error.data?.message || 'Registration failed. Please try again.';
                    setMessage({ success: '', error: errorMessage });
                  }
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="space-y-4 w-full">
                  {/* Full Name */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Full Name *
                    </label>
                    <Field
                      name="fullName"
                      value={values.fullName || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Company Name *
                    </label>
                    <Field
                      name="businessName"
                      value={values.businessName || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      placeholder="Enter company name"
                    />
                    <ErrorMessage
                      name="businessName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Company Email Address *
                    </label>
                    <Field
                      type="email"
                      name="email"
                      value={values.email || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      placeholder="company@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Country of Origin
                    </label>
                    <Field
                      as="select"
                      name="countryOfOrigin"
                      id="countryOfOrigin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Phone Number *
                    </label>
                    <Field name="phone">
                      {({ field, form }) => (
                        <PhoneNumberInput 
                          field={{
                            ...field,
                            value: field.value || ''
                          }}
                          form={form}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Date of Establishment */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Date of Establishment *
                    </label>
                    <Field
                      type="date"
                      name="businessDateOfEstab"
                      value={values.businessDateOfEstab || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <ErrorMessage
                      name="businessDateOfEstab"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Company Address */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Company Address *
                    </label>
                    <Field
                      name="businessLocation"
                      value={values.businessLocation || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      placeholder="Enter company address"
                    />
                    <ErrorMessage
                      name="businessLocation"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>


                  {/* Registration ID */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      License/Registration ID *
                    </label>
                    <Field
                      type="text"
                      name="registrationId"
                      value={values.registrationId || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      placeholder="Enter registration ID"
                    />
                    <ErrorMessage
                      name="registrationId"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* License Type */}
                  <div className="relative border border-gray-300 rounded-lg px-3">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      License Type *
                    </label>
                    <div className="py-6 space-y-2">
                      {[
                        { value: "Product Registration License", label: "Product Registration License" },
                        { value: "Operation License", label: "Operation License" },
                        { value: "Facility and Premises Approval", label: "Facility and Premises Approval" },
                        { value: "Specialized License and permits", label: "Specialized License and permits" }
                      ].map((option, index) => (
                        <div key={option.value} className="flex items-center">
                          <Field
                            type="radio"
                            name="licenseType"
                            value={option.value}
                            id={`licenseType${index + 1}`}
                            checked={values.licenseType === option.value}
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`licenseType${index + 1}`} className="text-sm cursor-pointer">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <ErrorMessage
                      name="licenseType"
                      component="div"
                      className="text-red-500 text-xs pb-2"
                    />
                  </div>

                  {/* Certifications */}
                  <div className="relative border border-gray-300 rounded-lg px-3">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Certifications (Optional)
                    </label>
                    <div className="py-6 space-y-2">
                      {[
                        { value: "ISO", label: "ISO" },
                        { value: "WHO", label: "WHO" },
                        { value: "GMP", label: "GMP" }
                      ].map((cert, index) => (
                        <div key={cert.value} className="flex items-center">
                          <Field
                            type="checkbox"
                            name="certifications"
                            value={cert.value}
                            id={`certification${index + 1}`}
                            checked={values.certifications?.includes(cert.value) || false}
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`certification${index + 1}`} className="text-sm cursor-pointer">
                            {cert.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <ErrorMessage
                      name="certifications"
                      component="div"
                      className="text-red-500 text-xs pb-2"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Password *
                    </label>
                    <Field
                      type="password"
                      name="password"
                      value={values.password || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      placeholder="Create a strong password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="relative border border-gray-300 rounded-lg">
                    <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
                      Confirm Password *
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword || ''}
                      className="w-full px-4 py-2 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      placeholder="Confirm your password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <Field 
                      type="checkbox" 
                      name="agreeToTerms" 
                      checked={values.agreeToTerms || false}
                      className="w-4 h-4 mt-1 text-blue-600 focus:ring-blue-500" 
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a>
                    </label>
                  </div>
                  <ErrorMessage name="agreeToTerms" component="div" className="text-red-500 text-xs" />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isCreating}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || isCreating ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  {/* Loading Indicator */}
                  {isCreating && (
                    <div className="text-center text-sm text-gray-600">
                      Please wait while we create your account...
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
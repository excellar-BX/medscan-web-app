import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import logi from '../assets/images/image 2.png';

export default function SignInManufactur() {
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    birthDate: Yup.date().required('Birth date is required'),
    country: Yup.string().required('Country name is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('https://meds-scan-backend.vercel.app/api/auth/register', values);
      console.log(response.data);
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ api: error.response.data.message });
      } else {
        setErrors({ api: 'An error occurred. Please try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex sm:mx-10 lg:mx-40">
      <div className="login-image h-[800px] w-1/2 flex justify-center items-center">
        <img src={logi} alt="" className="contrast-200 w-44" />
      </div>

      <div className='w-1/2 ml-10'>
        <h2 className='text-2xl font-extrabold'>Create an Account</h2>
        <p className=' mt-6 text-2xl'>You are creating an account </p>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phoneNumber: '',
            birthDate: '',
            country: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className='flex text-[#1E1E1EB2] gap-4 flex-col'>
                <Field className='text-xl p-2 border-b-4' placeholder="Full Name" type="text" name="fullName" />
                <ErrorMessage name="fullName" component="div" />

                <Field className='text-xl p-2 border-b-4' type="email" placeholder="Your Email Here" name="email" />
                <ErrorMessage name="email" component="div" />

                <Field className='text-xl p-2 border-b-4' type="number" placeholder='+234' name="phoneNumber" />
                <ErrorMessage name="phoneNumber" component="div" />

                <Field className='text-xl p-2 border-b-4' type="month" placeholder="Birth Date" name="birthDate" />
                <ErrorMessage name="birthDate" component="div" />

                <Field className='text-xl p-2 border-b-4' type="text" name="country" placeholder="Country Name" />
                <ErrorMessage name="country" component="div" />

                <Field className='text-xl p-2 border-b-4' type="password" name="password" placeholder="password" />
                <ErrorMessage name="password" component="div" />

                <Field className='text-xl p-2 border-b-4' type="password" name="confirmPassword" placeholder="confirm password" />
                <ErrorMessage name="confirmPassword" component="div" />

                {errors.api && <div className="error">{errors.api}</div>}

                <div className='flex gap-4 mt-8'>
                  <input className='h-8 w-8' type="checkbox" name="" id="" />
                  <p className=' text-xl'>I agree to the <a href="" target='blank' className=' text-[#0084fc]'>Terms of service</a> and <a href="" className=' text-[#0084fc]'>Privacy Policy</a></p>
                </div>
                <button className='p-8 bg-[#0084fc] rounded-md' type="submit" disabled={isSubmitting}>Create Account</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
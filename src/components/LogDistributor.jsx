import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logi from '../assets/images/image 2.png';

export default function LogDistributor() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
      const response = await axios.post('https://meds-scan-backend.onrender.com/api/auth/login', {
        email: email.value,
        password: password.value,
      });

      if (response.status === 200) {
        const { token, userId } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        console.log('Login successful, userId and token stored in localStorage');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='max-h-[400px] flex bg-slate-100 sm:mx-5 lg:mx-40'>
      <div className="login-image h-[800px] w-1/2 flex justify-center items-center">
        <img src={logi} alt="Login" className="contrast-200 w-44" />
      </div>
      <div className='rounded-3xl w-1/2 bg-[#ffff]'>
        <h2 className='ml-6 font-extrabold text-3xl mt-8 mb-6'>Log In</h2>
        <p className='ml-6 text-xl mb-6'>You are signing in </p>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col ml-6 gap-2'>
            <input className='p-4 text-2xl border-b-2' placeholder='Email Address' type="email" name="email" required />
            <input className='p-4 text-2xl border-b-2' placeholder='Password' type="password" name="password" required />
            <div className='flex gap-4 mt-8'>
              <input className='h-8 w-8' type="checkbox" name="rememberMe" id="rememberMe" />
              <p className='text-xl'>Remember Me</p>
            </div>
            <button className='bg-[#3b82f6] w-[300px] my-14 text-white text-center py-6 px-20 rounded-3xl' type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}
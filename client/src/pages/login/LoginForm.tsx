import { useState, useEffect } from 'react';
import LOGIN_IMAGE from '../../assets/fitness6.png';
import GOOGLE_ICON from '../../assets/google.png';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const useTokenExpiration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Her dakika kontrol et
    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]);
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useTokenExpiration(); // Token süresini kontrol eden hook'u çağır

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const userData = { u_email: email, u_password: password };
      const response = await authService.login(userData);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      if (response.user.u_role === "66536ca7cc843b0a8ebfb8d1") {
        navigate('/user');
      } else if (response.user.u_role === "6655bdfb4b1d1a8b2cb12919") {
        navigate('/admin');
      } else {
        alert('Please contact the official.');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
      console.error(error);
    }
  };

  return (
    <div className='w-full h-screen flex items-start bg-[#FFF8F3]'>
      <div className='relative w-1/2 h-full flex flex-col'>
        <img src={LOGIN_IMAGE} className='w-full h-full object-cover m-5'></img>
      </div>

      <div className='w-1/2 h-full bg-[#FFF8F3] flex flex-col p-20 justify-between'>
        <h1 className='text-xl text-[#405D72] font-semibold'>Fitness Tracker</h1>

        <div className='w-full flex flex-col max-w-[500px]'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-3xl font-semibold mb-2'>Login</h3>
            <p className='text-base mb-2'>Welcome Back! Please enter your details.</p>
          </div>

          <div className='w-full flex flex-col'>
            <input className='w-full text-[#405D72] py-2 my-2 bg-transparent border-b border-blue-500 outline-none focus:outline-none' type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
            <input className='w-full text-[#405D72] py-2 my-2 bg-transparent border-b border-blue-500 outline-none focus:outline-none' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
          </div>

          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center'>
              <input type='checkbox' className='w-4 h-4 mr-2'></input>
              <p className='text-sm'>Remember me for 30 days</p>
            </div>

            <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 text-[#405D72]'>Forgot Password?</p>
          </div>

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

          <div className='w-full flex flex-col my-4'>
            <button className='w-full text-white my-2 font-semibold bg-[#405D72] rounded-md p-4 text-center flex items-center justify-center' onClick={handleSubmit}>Login</button>
          </div>

          <div className='w-full flex items-center justify-center relative py-2'>
            <div className='w-full h-[1px] bg-black'></div>
            <p className='text-lg absolute text-black/80 bg-[#FFF8F3]'>or</p>
          </div>

          <div className='w-full text-[#405D72] my-2 font-semibold bg-[FFF8F3] border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
            <img src={GOOGLE_ICON} className='h-6 mr-2'></img>
            Sign in with Google
          </div>
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
          <p className='text-sm font-normal text-[#405D72]'>Do you want 2FA login? <Link to="/2faLogin" className='font-semibold underline underline-offset-2 cursor-pointer'>2FA Login</Link></p>
          <p className='text-sm font-normal text-[#405D72]'>Dont have a account? <Link to="/register" className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
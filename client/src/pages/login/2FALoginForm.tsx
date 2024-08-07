import { useState } from 'react';
import LOGIN_IMAGE from '../../assets/fitness6.png';
import { Link } from 'react-router-dom';
import authService from '../../services/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const getCode = async () => {
    try{
      const userData = { u_email: email, u_password: password };
      await authService.login2FA(userData);
      alert('Code has been sent, check your email.');
    } catch (error){
      console.error(error);
    }
  }

  const handleSubmit = async () => {
    try{
      const userData = { u_email: email, twoFACode: code };
      const response = await authService.verify2FA(userData);
      console.log(response.message);
    } catch (error){
      console.error(error);
    }
  }

  return (
    <div className='w-full h-screen flex items-start bg-[#FFF8F3]'>
      <div className='relative w-1/2 h-full flex flex-col'>
        <img src={LOGIN_IMAGE} className='w-full h-full object-cover m-5'></img>
      </div>

      <div className='w-1/2 h-full bg-[#FFF8F3] flex flex-col p-20 justify-between'>
        <h1 className='text-xl text-[#405D72] font-semibold'>Fitness Tracker</h1>

        <div className='w-full flex flex-col max-w-[500px]'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-3xl font-semibold mb-2 text-[#405D72]'>2Fa verify login</h3>
            <p className='text-base mb-2 text-[#405D72]'>Welcome Back! Please enter your details.</p>
          </div>

          <div className='w-full flex flex-col'>
            <input className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' type='email' placeholder='Email' value={email} onChange={handleEmailChange}></input>
            <input className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' type='password' placeholder='Password'value={password} onChange={handlePasswordChange}></input>
          </div>

          <div className='w-full flex flex-col my-4'>
            <button className='w-full text-white my-2 font-semibold bg-[#405D72] rounded-md p-4 text-center flex items-center justify-center' onClick={getCode}>Send Code</button>
          </div>

          <div className='w-full flex flex-col'>
            <input className='w-full text-[#405D72] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' type='text' placeholder='Code' value={code} onChange={handleCodeChange}></input>
          </div>

          <div className='w-full flex flex-col my-4'>
            <button className='w-full text-white my-2 font-semibold bg-[#405D72] rounded-md p-4 text-center flex items-center justify-center' onClick={handleSubmit}>Login</button>
          </div>
        </div>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#405D72]'>Dont have a account? <Link to="/register" className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

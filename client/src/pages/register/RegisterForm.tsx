import { useState } from 'react';
import LOGIN_IMAGE from '../../assets/fitness6.png';
import { Link } from 'react-router-dom';
import authService from '../../services/auth';
import { useNavigate } from 'react-router-dom'; 

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async () => {
    if(password === password2){
      try{
        const userData = { u_role: "66536ca7cc843b0a8ebfb8d1", u_name: name, u_email: email, u_password: password };
        await authService.register(userData);
        alert('Registration was successful.');
        navigate('/login');
      } catch(error){
        alert('Registration was not successful.');
      }
    } else{
      alert('Passwords do not match.');
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
            <h3 className='text-3xl font-semibold mb-2'>Register</h3>
            <p className='text-base mb-2'>Welcome! Please enter your details.</p>
          </div>

          <div className='w-full flex flex-col'>
            <input className='w-full text-[#405D72] py-2 my-2 bg-transparent border-b border-blue-500 outline-none focus:outline-none' type='name' placeholder='Name' value={name} onChange={handleNameChange}></input>
            <input className='w-full text-[#405D72] py-2 my-2 bg-transparent border-b border-blue-500 outline-none focus:outline-none' type='email' placeholder='Email' value={email} onChange={handleEmailChange}></input>
            <input className='w-full text-[#405D72] py-2 my-2 bg-transparent border-b border-blue-500 outline-none focus:outline-none' type='password' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
            <input className='w-full text-[#405D72] py-2 my-2 bg-transparent border-b border-blue-500 outline-none focus:outline-none' type='password' placeholder='Password Confirm' value={password2} onChange={handlePassword2Change}></input>
          </div>

          <div className='w-full flex flex-col my-4'>
            <button className='w-full text-white my-2 font-semibold bg-[#405D72] rounded-md p-4 text-center flex items-center justify-center' onClick={handleSubmit}>Register</button>
          </div>
        </div>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#405D72]'>Do have a account? <Link to="/login" className='font-semibold underline underline-offset-2 cursor-pointer'>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

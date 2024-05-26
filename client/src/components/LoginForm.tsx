import LOGIN_IMAGE from '../assets/fitness6.png';
import GOOGLE_ICON from '../assets/google.png';

const LoginForm: React.FC = () => {
  return (
    <div className='w-full h-screen flex items-start bg-[#f5f5f5]'>
      <div className='relative w-1/2 h-full flex flex-col'>
        <img src={LOGIN_IMAGE} className='w-full h-full object-cover m-5'></img>
      </div>

      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
        <h1 className='text-xl text-[#060606] font-semibold'>Interactive Brand</h1>

        <div className='w-full flex flex-col max-w-[500px]'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-3xl font-semibold mb-2'>Login</h3>
            <p className='text-base mb-2'>Welcome Back! Please enter your details.</p>
          </div>

          <div className='w-full flex flex-col'>
            <input className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' type='email' placeholder='Email'></input>
            <input className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' type='password' placeholder='Password'></input>
          </div>

          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center'>
              <input type='checkbox' className='w-4 h-4 mr-2'></input>
              <p className='text-sm'>Remember me for 30 days</p>
            </div>

            <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password?</p>
          </div>

          <div className='w-full flex flex-col my-4'>
            <button className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>Login</button>
            <button className='w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>Register</button>
          </div>

          <div className='w-full flex items-center justify-center relative py-2'>
            <div className='w-full h-[1px] bg-black'></div>
            <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>or</p>
          </div>

          <div className='w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
            <img src={GOOGLE_ICON} className='h-6 mr-2'></img>
            Sign in with Google
          </div>
        </div>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#060606]'>Dont have a account? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

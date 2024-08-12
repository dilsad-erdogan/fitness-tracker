import '../style.scss';
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import { useState } from 'react';
import uServices from '../../../services/user';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const id = user._id;
  const [name, setName] = useState(user.u_name);
  const [email, setEmail] = useState(user.u_email);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const logoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSaveName = async () => {
    try{
      await uServices.updateName(id, { u_name: name });
    } catch (error){
      console.error(error);
    }
    logoutClick();
  };

  const handleSaveEmail = async () => {
    try{
      await uServices.updateEmail(id, { u_email: email });
    } catch (error){
      console.error(error);
    }
    logoutClick();
  };

  const handleSavePassword = async () => {
    if(password === password2){
      try{
        await uServices.updatePassword(id, { u_password: password });
      } catch (error){
        console.error(error);
      }
      logoutClick();
    } else{
      alert('Password değerleri eşleşmiyor, düzeltiniz.');
    }
  };

  return (
    <div className='adminPanel'>
      <Sidebar></Sidebar>

      <div className='homeContainer'>
        <Navbar></Navbar>

        <div className='settings'>
          <div className='panel'>
            <div className="title">Settings</div>

            <form className='userInfoForm'>
              <div className='formGroup'>
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold text-[#F7E7DC] bg-[#405D72] rounded-lg px-4 py-2 dark:text-[#405D72] dark:bg-[#F7E7DC] focus:outline-none" onClick={handleSaveName}>Edit Name</button>
              </div>

              <div className='formGroup'>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold text-[#F7E7DC] bg-[#405D72] rounded-lg px-4 py-2 dark:text-[#405D72] dark:bg-[#F7E7DC] focus:outline-none" onClick={handleSaveEmail}>Edit Email</button>
              </div>

              <div className='formGroup'>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='formGroup'>
                <label htmlFor='password'>Password again:</label>
                <input type='password' id='password2' name='password2' placeholder='Enter your password again' value={password2} onChange={(e) => setPassword2(e.target.value)} />
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold text-[#F7E7DC] bg-[#405D72] rounded-lg px-4 py-2 dark:text-[#405D72] dark:bg-[#F7E7DC] focus:outline-none" onClick={handleSavePassword}>Edit Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
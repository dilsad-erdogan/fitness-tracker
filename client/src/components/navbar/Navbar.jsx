import './navbar.scss';
import { CiSearch } from "react-icons/ci";
import { IoEarthOutline, IoMoonOutline, IoNotifications } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { useContext } from 'react';
import { DarkModeContext } from './context/context';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type='text' placeholder='Search...'></input>
          <CiSearch></CiSearch>
        </div>

        <div className="items">
          <div className="item">
            <IoEarthOutline className='icon'></IoEarthOutline>
            English
          </div>
          <div className="item">
            <IoMoonOutline className='icon' onClick={() => dispatch({type:"TOGGLE"})}></IoMoonOutline>
          </div>
          <div className="item">
            <IoNotifications className='icon'></IoNotifications>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <FaRegMessage className='icon'></FaRegMessage>
            <div className="counter">2</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
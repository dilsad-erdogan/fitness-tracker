import './sidebar.scss';
import { MdDomain, MdOutlineSportsGymnastics } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { SlGraph } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import MenuLink from './MenuLink';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "My Dashboard",
        path: "/user",
        icon: <MdDomain></MdDomain>
      },
      {
        title: "My Workoutplan",
        path: "/user/plan",
        icon: <MdOutlineSportsGymnastics></MdOutlineSportsGymnastics>
      },
      {
        title: "My Goals",
        path: "/user/goals",
        icon: <LuListTodo></LuListTodo>
      },
      {
        title: "My İstatistikler",
        path: "/user/ista",
        icon: <SlGraph></SlGraph>
      },
      {
        title: "Profile",
        path: "/user/profile",
        icon: <FaUser></FaUser>
      }
    ]
  }
];

const SidebarinUser = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem('user')).u_name);
  }, [localStorage.getItem('user')]);

  const logoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <Link to="/user" style={{ textDecoration: "none" }}>
          <span className='logo'>{userName}</span>
        </Link>
      </div>

      <hr></hr>

      <div className='center'>
        <ul>
          {menuItems.map((item) => (
            <li key={item.title}>
              <p className='title'>{item.title}</p>
              {item.list.map((data) => (
                <MenuLink data={data} key={data.title}></MenuLink>
              ))}
            </li>
          ))}
        </ul>
      </div>

      <button className='logout' onClick={logoutClick}>
        <CiLogout></CiLogout>
        Logout
      </button>
    </div>
  )
}

export default SidebarinUser
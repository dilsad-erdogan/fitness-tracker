import './sidebar.scss';
import { MdDomain, MdOutlineSportsGymnastics, MdOutlineSettingsAccessibility } from "react-icons/md";
import { FaUser, FaMask } from "react-icons/fa";
import { LuSubtitles, LuListTodo } from "react-icons/lu";
import { CgGym } from "react-icons/cg";
import { FaUserNinja } from "react-icons/fa6";
import { RiUserSearchFill, RiNotification2Line } from "react-icons/ri";
import { IoIosBody } from "react-icons/io";
import { SlCalender, SlGraph } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import MenuLink from './MenuLink';
import { useEffect, useState } from 'react';

const menuItems = [
  {
    title: "Main",
    list: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: <MdDomain></MdDomain>
      }
    ]
  },
  {
    title: "List",
    list: [
      {
        title: "Users",
        path: "/admin/user",
        icon: <FaUser></FaUser>
      },
      {
        title: "Movement",
        path: "/admin/movement",
        icon: <MdOutlineSportsGymnastics></MdOutlineSportsGymnastics>
      },
      {
        title: "Movement Title",
        path: "/admin/title",
        icon: <LuSubtitles></LuSubtitles>
      },
      {
        title: "Program",
        path: "/admin/program",
        icon: <CgGym></CgGym>
      },
      {
        title: "User Program",
        path: "/admin/userProgram",
        icon: <FaUserNinja></FaUserNinja>
      },
      {
        title: "User Role",
        path: "/admin/role",
        icon: <RiUserSearchFill></RiUserSearchFill>
      },
      {
        title: "Set",
        path: "/admin/set",
        icon: <MdOutlineSettingsAccessibility></MdOutlineSettingsAccessibility>
      },
      {
        title: "Height Weight",
        path: "/admin/hw",
        icon: <IoIosBody></IoIosBody>
      },
      {
        title: "To-do List",
        path: "/admin/todo",
        icon: <LuListTodo></LuListTodo>
      },
      {
        title: "Weekly Calorie",
        path: "/admin/weekly",
        icon: <SlCalender></SlCalender>
      }
    ]
  },
  {
    title: "Useful",
    list: [
      {
        title: "İstatistikler",
        path: "/admin/ista",
        icon: <SlGraph></SlGraph>
      },
      {
        title: "Bildirimler",
        path: "/admin/noti",
        icon: <RiNotification2Line></RiNotification2Line>
      }
    ]
  },
  {
    title: "Services",
    list: [
      {
        title: "Logs",
        path: "/admin/logs",
        icon: <FaMask></FaMask>
      },
      {
        title: "Settings",
        path: "/admin/setting",
        icon: <IoSettingsOutline></IoSettingsOutline>
      }
    ]
  }
]

const Sidebar = () => {
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
        <Link to="/admin" style={{ textDecoration: "none", margin: 20 }}>
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

export default Sidebar
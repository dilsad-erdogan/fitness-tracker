import './widget.scss';
import { Link } from 'react-router-dom';

const Widget = ({ type, total }) => {
  let data;

  switch(type){
    case "users":
      data = {
        title: "TOTAL ACTIVE USERS",
        text: "See all users",
        link: "/admin/user"
      };
      break;
    case "movements":
      data = {
        title: "TOTAL ACTIVE MOVEMENT",
        text: "See all movement",
        link: "/admin/movement"
      };
      break;
    case "programs":
      data = {
        title: "TOTAL ACTIVE PROGRAMS",
        text: "See all program",
        link: "/admin/program"
      };
      break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className="title">{data.title}</span>
        <Link to={data.link} className='link'>
          <span>{data.text}</span>
        </Link>
      </div>
      <div className='right'>
        <span className='total'>{total}</span>
        <svg className="circle-container">
          <circle className='circle' cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="10" strokeDasharray={total*100} fill="transparent"></circle>
        </svg>
      </div>
    </div>
  )
}

export default Widget

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
        <Link to={data.link} style={{ textDecoration: "none", margin: 20 }}>
          <span className="link">{data.text}</span>
        </Link>
      </div>
      <div className='right'>
        <svg className="transform w-60 h-60">
          <circle className='circle' cx="170" cy="50" r="40" stroke="currentColor" strokeWidth="10" strokeDasharray={total*100} fill="transparent"></circle>
        </svg>
      </div>
    </div>
  )
}

export default Widget

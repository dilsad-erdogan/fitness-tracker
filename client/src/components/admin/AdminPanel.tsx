import './adminStyle.css';
import SideBar from './SideBar';

const AdminPanel = () => {
  return (
    <div className="adminPanel">
      <div className="menu">
        <SideBar></SideBar>
      </div>
      
      <div className="content">content</div>
    </div>
  );
}

export default AdminPanel
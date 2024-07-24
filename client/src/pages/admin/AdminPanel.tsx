import "./style.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const AdminPanel = () => {
  return (
    <div className="adminPanel">
      <Sidebar></Sidebar>
      <div className="homeContainer">
        <Navbar></Navbar>
      </div>
    </div>
  );
}

export default AdminPanel
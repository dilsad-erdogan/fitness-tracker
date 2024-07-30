import "../style.scss";
import Sidebar from "../../../components/sidebar/SidebarinAdmin";
import Navbar from "../../../components/navbar/Navbar";
import Widget from "../../../components/widgets/WidgetinAdmin";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import Program from "../../../components/mostPrograms/Programs";

const AdminPanel = () => {
  return (
    <div className="adminPanel">
      <Sidebar></Sidebar>

      <div className="homeContainer">
        <Navbar></Navbar>

        <div className="widgets">
          <Widget type="users"></Widget>
          <Widget type="movements"></Widget>
          <Widget type="programs"></Widget>
        </div>

        <div className="container">
          <div className="featured">
            <div className="featuredTitle">Active User Rate</div>
            <Featured></Featured>
          </div>

          <div className="chart">
            <div className="chartTitle">Usage Chart By Month</div>
            <Chart></Chart>
          </div>
        </div>

        <div className="programs">
          <div className="programsTitle">Most Used Programs</div>
          <Program></Program>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel
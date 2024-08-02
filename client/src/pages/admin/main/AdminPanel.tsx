import "../style.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/SidebarinAdmin";
import Navbar from "../../../components/navbar/Navbar";
import Widget from "../../../components/widgets/WidgetinAdmin";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import Program from "../../../components/mostPrograms/Programs";

import uServices from "../../../services/user";
import mServices from "../../../services/movement";
import pServices from "../../../services/program";
import upServices from "../../../services/userProgram";

const AdminPanel = () => {
  const [user, setUser] = useState('');
  const [movement, setMovement] = useState('');
  const [program, setProgram] = useState('');
  const [userProgram, setUserProgram] = useState('');

  useEffect(() => {
    const fetchUser = async() => {
      try{
        const response = await uServices.total();
        setUser(response.data);
      } catch(error){
        console.error(error);
      }
    };

    const fetchMovement = async() => {
      try{
        const response = await mServices.total();
        setMovement(response.data);
      } catch(error){
        console.error(error);
      }
    };

    const fetchProgram = async() => {
      try{
        const response = await pServices.total();
        setProgram(response.data);
      } catch(error){
        console.error(error);
      }
    };
    
    const fetchUserProgram = async() => {
      try{
        const response = await upServices.totalAll();
        setUserProgram(response.data);
      } catch(error){
        console.error(error);
      }
    };

    fetchUser();
    fetchMovement();
    fetchProgram();
    fetchUserProgram();
  });

  return (
    <div className="adminPanel">
      <Sidebar></Sidebar>

      <div className="homeContainer">
        <Navbar></Navbar>

        <div className="widgets">
          <Widget type="users" total={user}></Widget>
          <Widget type="movements" total={movement}></Widget>
          <Widget type="programs" total={program}></Widget>
          <Widget type="userprograms" total={userProgram}></Widget>
        </div>

        <div className="container">
          <div className="featured">
            <Featured></Featured>
          </div>

          <div className="chart">
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
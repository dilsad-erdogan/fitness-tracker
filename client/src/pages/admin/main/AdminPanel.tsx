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
import sServices from "../../../services/set";

interface Item {
  _id: string;
  s_pid: string;
  s_mid: string;
  date_time: string;
  is_active: boolean;
}

const AdminPanel = () => {
  const [user, setUser] = useState<any>(null);
  const [movement, setMovement] = useState<any>(null);
  const [program, setProgram] = useState<any>(null);
  const [userProgram, setUserProgram] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await uServices.total();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchMovement = async () => {
      try {
        const response = await mServices.total();
        setMovement(response.data);
      } catch (error) {
        console.error('Error fetching movement:', error);
      }
    };

    const fetchProgram = async () => {
      try {
        const response = await pServices.total();
        setProgram(response.data);
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };

    const fetchUserProgram = async () => {
      try {
        const response = await upServices.totalAll();
        setUserProgram(response.data);
      } catch (error) {
        console.error('Error fetching user program:', error);
      }
    };

    const getTopThreePID = async () => {
      try {
        const response = await sServices.get();
        const frequency: { [key: string]: number } = {};

        response.data.forEach((item: Item) => {
          frequency[item.s_pid] = (frequency[item.s_pid] || 0) + 1;
        });

        const topThree = Object.entries(frequency)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(entry => entry[0]);

        return topThree;
      } catch (error) {
        console.error('Error getting top three p_id values:', error);
        throw error;
      }
    };

    const findProgram = async (ids: string[]) => {
      try {
        const responses = await Promise.all(
          ids.map(async (id) => {
            return await pServices.byId(id);
          })
        );

        setPrograms(responses);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    const loadData = async () => {
      await fetchUser();
      await fetchMovement();
      await fetchProgram();
      await fetchUserProgram();

      const topThree = await getTopThreePID();
      
      if (topThree.length > 0) {
        await findProgram(topThree);
      }
    };

    loadData();
  }, []);

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
          <Program programs={programs}></Program>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel
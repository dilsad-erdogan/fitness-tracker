import "../style.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/SidebarinUser";
import Navbar from "../../../components/navbar/Navbar";
import Message from "../../../components/diaryMessage/Message";
import Widget from "../../../components/widgets/WidgetinUser";
import Todolist from "../../../components/todolist/Todolist";
import DailyPlan from "../../../components/dailyPlan/DailyPlan";
import Weather from "../../../components/weather/Weather";
import Profile from "../../../components/userProfile/Profile";
import WeeklySport from "../../../components/weeklySport/WeeklySport";

import userProgramServices from "../../../services/userProgram";
import wServices from "../../../services/weeklyCalorie";
import hwServices from "../../../services/heightWeight";

const UserPanel = () => {
  const [user, setUser] = useState('');
  const [calorie, setCalorie] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setUserid] = useState('');
  const [program, setProgram] = useState([]);
  const [allCalorie, setAllcalorie] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      let id: string;
      try {
        id = JSON.parse(storedUser)._id;
        setUserid(id);
        setName(JSON.parse(storedUser).u_name);
        setEmail(JSON.parse(storedUser).u_email);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return;
      }
  
      const fetchUser = async() => {
        try {
          const response = await userProgramServices.total(id);
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchUProgram = async() => {
        try{
          const response = await userProgramServices.get(id);
          setProgram(response.data);
        } catch (error){
          console.error(error);
        }
      };

      const fetchCalorie = async() => {
        try{
          const response = await wServices.byId(id);
          setAllcalorie(response.data);
          const currentDayIndex = new Date().getDay();
          const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
          
          const currentDay = dayMap[currentDayIndex];

          setCalorie(response.data[currentDay]);
        } catch(error) {
          console.error(error);
        }
      };

      const fetchWeight = async() => {
        try{
          const response = await hwServices.byId(id);
          setWeight(response.data.weight);
        } catch(error) {
          console.error(error);
        }
      };
  
      const fetchHeight = async() => {
        try{
          const response = await hwServices.byId(id);
          setHeight(response.data.height);
        } catch(error) {
          console.error(error);
        }
      };

      fetchUser();
      fetchUProgram();
      fetchCalorie();
      fetchWeight();
      fetchHeight();
    } else {
      console.error("User not found in localStorage");
    }
  }, []);
  
  return (
    <div className='userPanel'>
      <Sidebar></Sidebar>

      <div className='homeContainer'>
        <Navbar></Navbar>

        <div className="container">
          <div className="leftContainer">
            <div className="diaryMessage">
              <Message name={name}></Message>
            </div>

            <div className="widgets">
              <Widget type="user" total={user}></Widget>
              <Widget type="time" total={user}></Widget>
              <Widget type="calorie" total={calorie}></Widget>
              <Widget type="weight" total={weight}></Widget>
            </div>

            <div className="blocks">
              <div className="todoList">
                <Todolist userid={userid}></Todolist>
              </div>

              <div className="dailyPlan">
                <DailyPlan programs={program}></DailyPlan>
              </div>
            </div>
          </div>

          <div className="rightContainer">
            <div className="profile">
              <Profile name={name} email={email} weight={weight} height={height}></Profile>
            </div>

            <div className="weather">
              <Weather></Weather>
            </div>

            <div className="weeklySports">
              <WeeklySport calories={allCalorie}></WeeklySport>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPanel
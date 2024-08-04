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
import Info from "../../../components/userProfile/Info";
import WeeklySport from "../../../components/weeklySport/WeeklySport";

import userProgramServices from "../../../services/userProgram";
import wServices from "../../../services/weeklyCalorie";
import hwServices from "../../../services/heightWeight";

const UserPanel = () => {
  const [user, setUser] = useState('');
  const [calorie, setCalorie] = useState('');
  const [weight, setWeight] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      let id: string;
      try {
        id = JSON.parse(storedUser)._id;
        setName(JSON.parse(storedUser).u_name);
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

      const fetchCalorie = async() => {
        try{
          const response = await wServices.byId(id);
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
  
      fetchUser();
      fetchCalorie();
      fetchWeight();
    } else {
      console.error("User not found in localStorage");
    }
  }, [localStorage.getItem('user')]);

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
                <div className="todoListTitle">To-do List</div>
                <Todolist></Todolist>
              </div>

              <div className="dailyPlan">
                <div className="dailyPlanTitle">Daily Workout Plan</div>
                <DailyPlan></DailyPlan>
              </div>
            </div>
          </div>

          <div className="rightContainer">
            <div className="weather">
              <Weather></Weather>
            </div>

            <div className="userProfile">
              <div className="profile">
                <Profile></Profile>
              </div>
              
              <div className="info">
                <Info type="boy"></Info>
                <Info type="kilo"></Info>
                <Info type="hedef"></Info>
              </div>
            </div>

            <div className="weeklySports">
              <WeeklySport></WeeklySport>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPanel
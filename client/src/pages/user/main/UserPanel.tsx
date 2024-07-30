import "../style.scss";
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

const UserPanel = () => {
  return (
    <div className='userPanel'>
      <Sidebar></Sidebar>

      <div className='homeContainer'>
        <Navbar></Navbar>

        <div className="container">
          <div className="leftContainer">
            <div className="diaryMessage">
              <Message></Message>
            </div>

            <div className="widgets">
              <Widget type="user programs"></Widget>
              <Widget type="total time in day"></Widget>
              <Widget type="calorie in day"></Widget>
              <Widget type="weight"></Widget>
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
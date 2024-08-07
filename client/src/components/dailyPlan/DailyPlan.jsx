import './dailyplan.scss';
import { BsCalendar2Week } from "react-icons/bs";
import { LuDumbbell } from "react-icons/lu";

const DailyPlan = ({ programs }) => {
  return (
    <div className='dailyplan flex flex-col p-7 min-h-[500px] rounded-[20px]'>
      <div className="title">
        <BsCalendar2Week></BsCalendar2Week>
        <span>Daily Plan</span>
      </div>
      
      <div className="programs">
        {programs.map((program) => (
          <div className='program' key={program._id}>
            <div className="title">
              <LuDumbbell></LuDumbbell>
              {program.up_name} :
            </div>

            <div className='content'>
              <div>-Description: {program.up_description}</div>
              <div>-Duration: {program.duration}</div>
              <div>-Time: {program.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyPlan
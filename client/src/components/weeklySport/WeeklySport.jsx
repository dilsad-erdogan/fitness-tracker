import './weekly.scss';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WeeklySport = ({ calories }) => {
  const data = [
    { name: "Monday", Calorie: calories.monday },
    { name: "Tuesday", Calorie: calories.tuesday },
    { name: "Wednesday", Calorie: calories.wednesday },
    { name: "Thursday", Calorie: calories.thursday },
    { name: "Friday", Calorie: calories.friday },
    { name: "Saturday", Calorie: calories.saturday },
    { name: "Sunday", Calorie: calories.sunday }
  ];

  return (
    <div className='weeklyContainer'>
      <div className="title">Weekly Calorie</div>

      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#405D72" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area type="monotone" dataKey="Calorie" stroke="#405D72" fillOpacity={1} fill="url(#total)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklySport
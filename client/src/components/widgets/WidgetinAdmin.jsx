import './widget.scss';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Widget = ({ type, total }) => {
  let data;
  const chart = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 400 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 700 },
  ];

  switch(type){
    case "users":
      data = {
        title: "TOTAL ACTIVE USERS",
        text: "See all users"
      };
      break;
    case "movements":
      data = {
        title: "TOTAL ACTIVE MOVEMENT",
        text: "See all movement"
      };
      break;
    case "programs":
      data = {
        title: "TOTAL ACTIVE PROGRAMS",
        text: "See all program"
      };
      break;
    case "userprograms":
      data = {
        title: "TOTAL ACTIVE USER PROGRAMS",
        text: "See all user program"
      };
      break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className="title">{data.title}</span>
        <span className='total'>{total}</span>
      </div>

      <div className='right'>
        <ResponsiveContainer className='chart'>
          <LineChart data={chart}>
            <Line type="monotoneX" dataKey="value" stroke='#758694' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Widget

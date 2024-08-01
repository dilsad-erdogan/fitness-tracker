import './widget.scss';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const WidgetinUser = ({ type, total }) => {
  let title;
  const chart = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 400 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 700 },
  ];

  switch(type){
    case "user":
      title = "My Total Program";
      break;
    case "time":
      title = "Total time in a day";
      break;
    case "calorie":
      title = "Total calories in a day";
      break;
    case "weight":
      title = "My weight";
      break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className="title">{title}</span>
        <span className="total">{total}</span>
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

export default WidgetinUser
import './widget.scss';

const WidgetinUser = ({ type, total }) => {
  let title;

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
        <span className="linkUser">{total}</span>
      </div>
      <div className='right'>
        <svg className="transform w-60 h-60">
          <circle className='circle' cx="170" cy="50" r="40" stroke="currentColor" strokeWidth="10" strokeDasharray={total*100} fill="transparent"></circle>
        </svg>
      </div>
    </div>
  )
}

export default WidgetinUser
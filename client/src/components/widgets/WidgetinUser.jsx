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
      </div>
      <div className='right'>
        <span className='total'>{total}</span>
        <svg className="circle-container">
          <circle className='circle' cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="10" strokeDasharray={total*100} fill="transparent"></circle>
        </svg>
      </div>
    </div>
  )
}

export default WidgetinUser
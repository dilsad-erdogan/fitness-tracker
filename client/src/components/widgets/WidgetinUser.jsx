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
        <span className="total">{total}</span>
      </div>
    </div>
  )
}

export default WidgetinUser
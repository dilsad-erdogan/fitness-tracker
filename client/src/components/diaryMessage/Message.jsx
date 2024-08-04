import './message.scss';
import MESSAGE_IMG from '../../assets/fitness3.png';

const Message = ({ name }) => {
  return (
    <div className='messageBox'>
      <div className="left">
        <h1>Hello {name} !</h1>
        <p>Today it's a great day to be fit!</p>
      </div>

      <div className="right">
        <img src={MESSAGE_IMG} className='messageImage' alt="Fitness"></img>
      </div>
    </div>
  )
}

export default Message;
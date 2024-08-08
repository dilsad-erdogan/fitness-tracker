import './profile.scss';
import "react-circular-progressbar/dist/styles.css";
import Info from './Info';
import { CircularProgressbar } from 'react-circular-progressbar';
import profile_image from '../../assets/fitness5.png';

const Profile = ({ name, email, weight, height }) => {
  return (
    <div className='profileContainer'>
      <div className='circular'>
        <CircularProgressbar value={80} strokeWidth={5} className='circle'></CircularProgressbar>
        <img src={profile_image} alt="inner-image" className='inner-image' />
      </div>

      <div className='content'>
        <h1>{name}</h1>
        <p>{email}</p>
      </div>

      <div className='info'>
        <Info type="My Height" data={height}></Info>
        <Info type="My Weight" data={weight}></Info>
      </div>
    </div>
  )
}

export default Profile
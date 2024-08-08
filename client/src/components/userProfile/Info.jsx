import './profile.scss';

const Info = ({ type, data }) => {
  return (
    <div className='infoContainer'>
      <h1>{type}</h1>
      <p>{data}</p>
    </div>
  )
}

export default Info

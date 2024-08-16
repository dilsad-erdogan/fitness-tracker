import '../style.scss';
import Sidebar from '../../../components/sidebar/SidebarinUser';
import Navbar from '../../../components/navbar/Navbar';

const Statistics = () => {
  return (
    <div className='userPanel'>
      <Sidebar></Sidebar>

      <div className='homeContainer'>
        <Navbar></Navbar>

        <span>Statistics</span>
      </div>
    </div>
  )
}

export default Statistics
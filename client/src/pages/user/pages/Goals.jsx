import '../style.scss';
import Sidebar from '../../../components/sidebar/SidebarinUser';
import Navbar from '../../../components/navbar/Navbar';
import gServices from '../../../services/goals';
import { useEffect, useState } from 'react';
import { FaRegSquare, FaRegCheckSquare, FaRegMinusSquare } from "react-icons/fa";
import AddModal from '../../../components/modals/add/goals';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchGoals = async(id) => {
    try {
      const response = await gServices.get(id);
      setGoals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeDone = async(id) => {
    try{
      await gServices.updateDone(id);  
      fetchGoals(JSON.parse(localStorage.getItem('user'))._id);
    } catch(error){
      console.error(error);
    }
  };

  const deleted = async(id) => {
    try{
      await gServices.deleted(id);
      fetchGoals(JSON.parse(localStorage.getItem('user'))._id);
    } catch(error){
      console.error(error);
    }
  };

  const handleAdd = async () => {
    setIsAddModalOpen(true);
    fetchGoals(JSON.parse(localStorage.getItem('user'))._id);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      let id;
      try {
        id = JSON.parse(storedUser)._id;
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return;
      }

      fetchGoals(id);
    } else {
      console.error("User not found in localStorage");
    }
  }, []);

  return (
    <div className='userPanel'>
      <Sidebar></Sidebar>

      <div className='homeContainer'>
        <Navbar></Navbar>

        <div className="goals">
          {goals.map((goal) => (
            <div className={goal.is_done === true ? "goal true" : "goal false"} key={goal._id}>
              <div className='deleted' onClick={() => {deleted(goal._id)}}>
                <FaRegMinusSquare></FaRegMinusSquare>
              </div>

              <div className="left">
                {goal.is_done === true ? (<FaRegCheckSquare></FaRegCheckSquare>) : (<FaRegSquare></FaRegSquare>)}
              </div>

              <div className="right" onClick={() => {changeDone(goal._id)}}> 
                <div className="title">{goal.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 mr-5">
          <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold text-[#F7E7DC] bg-[#405D72] rounded-lg px-4 py-2 dark:text-[#405D72] dark:bg-[#F7E7DC] focus:outline-none" onClick={handleAdd}>Add</button>
        </div>
      </div>

      <AddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        id={JSON.parse(localStorage.getItem('user'))._id}
        fetchGoals={() => fetchGoals(JSON.parse(localStorage.getItem('user'))._id)}
      />
    </div>
  )
}

export default Goals
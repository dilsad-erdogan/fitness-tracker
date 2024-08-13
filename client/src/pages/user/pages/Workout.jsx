import "../style.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/SidebarinUser";
import Navbar from "../../../components/navbar/Navbar";
import userProgramServices from "../../../services/userProgram";
import { LuDumbbell } from "react-icons/lu";
import AddModal from "../../../components/modals/add/uProgram";

const Workout = () => {
  const [programs, setPrograms] = useState([]);
  const [id, setId] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      try {
        setId(JSON.parse(storedUser)._id);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return;
      }

      fetchUProgram();
    } else {
      console.error("User not found in localStorage");
    }
  });

  const handleAdd = async () => {
    setIsAddModalOpen(true);
    fetchUProgram();
  };
  
  const fetchUProgram = async() => {
    try{
      const response = await userProgramServices.get(id);
      setPrograms(response.data);
    } catch (error){
      console.error(error);
    }
  };

  return (
    <div className="userPanel">
      <Sidebar></Sidebar>

      <div className="homeContainer">
        <Navbar></Navbar>

        <div className="flex flex-col p-7 min-h-[500px] rounded-[20px]">
          <div className="title">My Workout Plans</div>

          <div className="plans">
            {programs.map((program) => (
              <div className="plan" key={program._id}>
                <div className="title">
                  <LuDumbbell></LuDumbbell>
                  {program.up_name} :
                </div>

                <div className='content'>
                  <div>-Description: {program.up_description}</div>
                  <div>-Duration: {program.duration}</div>
                  <div>-Time: {program.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold text-[#F7E7DC] bg-[#405D72] rounded-lg px-4 py-2 dark:text-[#405D72] dark:bg-[#F7E7DC] focus:outline-none" onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>

      <AddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        fetch={fetchUProgram}
        id={id}
      />
    </div>
  )
}

export default Workout
import "../style.scss";
import { useEffect, useState } from "react";
import { LuDumbbell } from "react-icons/lu";

import Sidebar from "../../../components/sidebar/SidebarinUser";
import Navbar from "../../../components/navbar/Navbar";
import AddModal from "../../../components/modals/add/uProgram";
import AddMovementModal from "../../../components/modals/add/userSet";

import userProgramServices from "../../../services/userProgram";
import sServices from "../../../services/set";
import mServices from "../../../services/movement";

const Workout = () => {
  const [programs, setPrograms] = useState([]);
  const [id, setId] = useState('');
  const [programId, setProgramId] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddMovementModalOpen, setIsAddMovementModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setId(parsedUser._id);
        fetchUProgram(parsedUser._id);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return;
      }
    } else {
      console.error("User not found in localStorage");
    }
  }, []);

  const handleAdd = async () => {
    setIsAddModalOpen(true);
    fetchUProgram();
  };

  const handleAddMovement = async (id) => {
    setIsAddMovementModalOpen(true);
    fetchUProgram();
    setProgramId(id);
  }

  const fetchUProgram = async(userId) => {
    try {
      const response = await userProgramServices.get(userId);
      const programsWithMovements = await Promise.all(
        response.data.map(async (program) => {
          const movementsResponse = await sServices.getMovements(program._id);
          const movements = await Promise.all(
            movementsResponse.data.map(async (movement) => {
              const movements = await mServices.byId(movement.s_mid);
              return movements.data;
            })
          );
          return {
            ...program,
            movements: movements,
          };
        })
      );

      setPrograms(programsWithMovements);
    } catch (error) {
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
                  <div>
                    {program.movements && program.movements.length > 0 ? (
                      program.movements.map((movement, index) => (
                        <div className="movement" key={index}>
                          <div className="title">{movement.m_name}</div>
                          <div>- Description: {movement.m_description}</div>
                        </div>
                      ))
                    ) : (
                      <div>No movements found</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold text-[#F7E7DC] bg-[#405D72] rounded-lg px-4 py-2 dark:text-[#405D72] dark:bg-[#F7E7DC] focus:outline-none" onClick={() => handleAddMovement(program._id)}>Add Movement</button>
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

      <AddMovementModal
        isOpen={isAddMovementModalOpen}
        onClose={() => setIsAddMovementModalOpen(false)}
        fetch={fetchUProgram}
        pId={programId}
      />
    </div>
  )
}

export default Workout
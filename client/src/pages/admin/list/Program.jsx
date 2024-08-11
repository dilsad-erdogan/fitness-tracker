import '../style.scss';
import { useEffect, useState } from "react"
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import pServices from '../../../services/program';
import Modal from '../../../components/modals/update/program';
import AddModal from '../../../components/modals/add/program';

const Program = () => {
  const [datas, setDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({});

  const fetchP = async() => {
    try{
      const response = await pServices.get();
      setDatas(response.data);
    } catch(error) {
      console.error(error);
    }
  };

  const deleted = async (id) => {
    try{
      await pServices.deleted(id);
      fetchP();
    } catch(error) {
      console.error(error);
    }
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setIsModalOpen(true);
    fetchP();
  };

  const handleAdd = async () => {
    setIsAddModalOpen(true);
    fetchP();
  };

  const handleSaveName = async () => {
    try {
      await pServices.updateName(currentRole._id, { p_name: currentRole.p_name });
      fetchP();
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handleSaveDescription = async () => {
    try {
      await pServices.updateDescription(currentRole._id, { p_description: currentRole.p_description });
      fetchP();
    } catch (error) {
      console.error('Error updating descripton:', error);
    }
  };

  const handleSaveDuration = async () => {
    try {
      await pServices.updateDuration(currentRole._id, { duration: currentRole.duration });
      fetchP();
    } catch (error) {
      console.error('Error updating duration:', error);
    }
  };

  const handleSaveTime = async () => {
    try {
      await pServices.updateTime(currentRole._id, { time: currentRole.time });
      fetchP();
    } catch (error) {
      console.error('Error updating time:', error);
    }
  };

  useEffect(() => {
    fetchP();
  }, []);

  return (
    <div className='adminPanel'>
      <Sidebar></Sidebar>

      <div className='homeContainer'>
        <Navbar></Navbar>

        <div className="flex flex-col mt-5">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-[#405D72] dark:divide-[#758694]">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Description</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Duration</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Time</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {datas.map((data) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.p_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium max-w-xs truncate">{data.p_description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" className="mr-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none" onClick={() => handleEdit(data)}>Edit</button>
                          <button type="button" className="ml-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none" onClick={() => {deleted(data._id)}}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end mt-4">
                  <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold text-[#F7E7DC] bg-[#405D72] rounded-lg px-4 py-2 dark:text-[#405D72] dark:bg-[#F7E7DC] focus:outline-none" onClick={handleAdd}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={currentRole}
        setData={setCurrentRole}
        onSaveName={handleSaveName}
        onSaveDescription={handleSaveDescription}
        onSaveDuration={handleSaveDuration}
        onSaveTime = {handleSaveTime}
      />

      <AddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        fetch={fetchP}
      />
    </div>
  )
}

export default Program
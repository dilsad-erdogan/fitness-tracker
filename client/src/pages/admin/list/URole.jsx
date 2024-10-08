import '../style.scss';
import { useEffect, useState } from "react";
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import urServices from '../../../services/userRole';
import Modal from '../../../components/modals/update/userRole';
import AddModal from '../../../components/modals/add/uRole';

const URole = () => {
  const [datas, setDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({});

  const fetchUR = async() => {
    try{
      const response = await urServices.get();
      setDatas(response.data);  
    } catch(error){
      console.error(error);
    }
  };

  const deleted = async (id) => {
    try{
      await urServices.deleted(id);
      fetchUR();
    } catch(error) {
      console.error(error);
    }
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setIsModalOpen(true);
    fetchUR();
  };

  const handleAdd = async () => {
    setIsAddModalOpen(true);
    fetchUR();
  };

  const handleSave = async () => {
    try {
      await urServices.update(currentRole._id, currentRole);
      fetchUR();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  useEffect(() => {
    fetchUR();
  }, []);

  return (
    <div className='adminPanel'>
      <Sidebar />

      <div className='homeContainer'>
        <Navbar />

        <div className="flex flex-col mt-5">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-[#405D72] dark:divide-[#758694]">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Name</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {datas.map((data) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.r_name}</td>
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
        onSave={handleSave} 
        data={currentRole} 
        setData={setCurrentRole}
      />

      <AddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        fetch={fetchUR}
      />
    </div>
  )
}

export default URole;
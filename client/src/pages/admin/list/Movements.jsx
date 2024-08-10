import '../style.scss';
import { useEffect, useState } from "react"
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import mServices from '../../../services/movement';
import mtServices from '../../../services/movementTitle';

const Movements = () => {
  const [datas, setDatas] = useState([]);
  const [title, setTitle] = useState({});

  const fetchM = async() => {
    try{
      const response = await mServices.get();
      setDatas(response.data);
      const mtIds = response.data.map(data => data.m_tid);
      const names = await Promise.all(mtIds.map(id => mtServices.byId(id)));
      const nameMap = {};
      names.forEach((res, index) => {
        nameMap[mtIds[index]] = res.data.t_name;
      });
      setTitle(nameMap);
    } catch(error){
      console.error(error);
    }
  };

  const deleted = async (id) => {
    try{
      await mServices.deleted(id);
      fetchM();
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchM();
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
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Title</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Description</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Photo</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Video</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Calorie</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {datas.map((data) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{title[data.m_tid]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.m_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium max-w-xs truncate">{data.m_description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.m_photo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.m_video}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.calorie}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" className="mr-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none">Edit</button>
                          <button type="button" className="ml-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none" onClick={() => {deleted(data._id)}}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movements
import '../style.scss';
import { useEffect, useState } from "react";
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import hwServices from "../../../services/heightWeight";
import uServices from '../../../services/user';

const HeightWeight = () => {
  const [datas, setDatas] = useState([]);
  const [userNames, setUserNames] = useState({});

  const fetchHW = async() => {
    try{
      const response = await hwServices.get();
      setDatas(response.data);
      const userIds = response.data.map(data => data.hw_uid);
      const names = await Promise.all(userIds.map(id => uServices.byId(id)));
      const nameMap = {};
      names.forEach((res, index) => {
        nameMap[userIds[index]] = res.data.u_name;
      });
      setUserNames(nameMap);
    } catch(error) {
      console.error(error);
    }
  };

  const deleted = async (id) => {
    try{
      await hwServices.deleted(id);
      fetchHW();
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHW();
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
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">User Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Height</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Weight</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {datas.map((data) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{userNames[data.hw_uid] || 'Loading...'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.height}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none" onClick={() => {deleted(data._id)}}>Delete</button>
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

export default HeightWeight;

import '../style.scss';
import { useEffect, useState } from "react"
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import wServices from '../../../services/weeklyCalorie';
import uServices from '../../../services/user';

const Weekly = () => {
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState({});

  const fetchW = async() => {
    try{
      const response = await wServices.get();
      setDatas(response.data);
      const uId = response.data.map(data => data.u_id);
      const names = await Promise.all(uId.map(id => uServices.byId(id)));
      const nameMap = {};
      names.forEach((res, index) => {
        nameMap[uId[index]] = res.data.u_name;
      });
      setName(nameMap);
    } catch(error){
      console.error(error);
    }
  };

  const deleted = async (id) => {
    try{
      await wServices.deleted(id);
      fetchW();
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchW();
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
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Monday</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Tuesday</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Wednesday</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Thursday</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Friday</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Saturday</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Sunday</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {datas.map((data) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{name[data.u_id]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.monday}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium max-w-xs">{data.tuesday}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.wednesday}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.thursday}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.friday}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.saturday}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.sunday}</td>
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

export default Weekly
import '../style.scss';
import { useEffect, useState } from "react"
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import sServices from '../../../services/set';
import pServices from '../../../services/program';
import mServices from '../../../services/movement';

const Set = () => {
  const [datas, setDatas] = useState([]);
  const [pName, setPName] = useState({});
  const [mName, setMName] = useState({});

  const fetchS = async() => {
    try{
      const response = await sServices.get();
      setDatas(response.data);
      const pId = response.data.map(data => data.s_pid);
      const mId = response.data.map(data => data.s_mid);
      const pNames = await Promise.all(pId.map(id => pServices.byId(id)));
      const mNames = await Promise.all(mId.map(id => mServices.byId(id)));
      const pNameMap = {}, mNameMap = {};
      pNames.forEach((res, index) => {
        pNameMap[pId[index]] = res.data.p_name;
      });
      mNames.forEach((res, index) => {
        mNameMap[mId[index]] = res.data.m_name;
      });
      setPName(pNameMap);
      setMName(mNameMap);
    } catch(error){
      console.error(error);
    }
  };

  const deleted = async (id) => {
    try{
      await sServices.deleted(id);
      fetchS();
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchS();
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
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Program Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Movement Name</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {datas.map((data) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pName[data.s_pid]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{mName[data.s_mid]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
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

export default Set
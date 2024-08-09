import '../style.scss';
import { useEffect, useState } from "react"
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';
import uServices from '../../../services/user';
import urServices from '../../../services/userRole';

const Users = () => {
  const [datas, setDatas] = useState([]);
  const [role, setRole] = useState({});

  const fetchU = async() => {
    try{
      const response = await uServices.get();
      setDatas(response.data);
      const rId = response.data.map(data => data.u_role);
      const names = await Promise.all(rId.map(id => urServices.byId(id)));
      const nameMap = {};
      names.forEach((res, index) => {
        nameMap[rId[index]] = res.data.r_name;
      });
      setRole(nameMap);
    } catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    fetchU();
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
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Role</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Email</th>
                      <th scope="col" className="px-6 py-3 text-end text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {datas.map((data) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{role[data.u_role]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{data.u_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium max-w-xs">{data.u_email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none">Delete</button>
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

export default Users
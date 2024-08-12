import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/sidebar/SidebarinAdmin';
import Navbar from '../../../components/navbar/Navbar';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Logları çekerken bir hata oluştu', error);
      }
    };

    fetchLogs();
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
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">History</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Level</th>
                      <th scope="col" className="px-6 py-3 text-start text-s font-medium text-[#405D72] uppercase dark:text-[#F7E7DC]">Message</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#FFF8F3] dark:divide-[#758694]">
                    {logs.map((log) => (
                      <tr className="text-[#405D72] hover:text-[#F7E7DC] hover:bg-[#405D72] dark:text-[#F7E7DC] dark:hover:text-[#405D72] dark:hover:bg-[#F7E7DC]" key={log._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{log.level}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{log.message}</td>
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

export default Logs;
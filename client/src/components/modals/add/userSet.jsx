import { useEffect, useState } from 'react';
import sServices from '../../../services/set';
import mServices from '../../../services/movement';

const AddModal = ({ isOpen, onClose, fetch, pId }) => {
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState({
        s_pid: '',
        s_mid: ''
    });

    useEffect(() => {
        if (pId) {
            setNewData(prevData => ({ ...prevData, s_pid: String(pId) }));
        }
        getMovement();
    }, [pId]);

    const handleMSelectChange = (e) => {
        const s_mid = e.target.value;
        setNewData({ ...newData, s_mid: s_mid });
    };

    const handleSave = async () => {
        console.log(newData);
        try{
            await sServices.add(newData);
        } catch(error) {
            console.error(error);
        };

        setNewData({
            s_pid: String(pId),
            s_mid: ''
        });
        fetch();
        onClose();
    };

    const getMovement = async () => {
        try{
            const response = await mServices.get();
            setData(response.data);
        } catch(error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#FFF8F3] bg-opacity-50">
            <div className="bg-[#FFF8F3] p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4 text-[#405D72]">Add Movement</h2>
                {/* Movement Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Select Movement</label>
                    <select
                        name="s_mid"
                        onChange={handleMSelectChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    >
                        <option value="">Select a movement</option>
                        {data.map((movement) => (
                        <option key={movement._id} value={movement._id}>
                            {movement.m_name}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Close</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
import { useState } from 'react';
import sServices from '../../../services/set';

const AddModal = ({ isOpen, onClose, fetch, pName, mName }) => {
    const [newData, setNewData] = useState({
        s_pid: '',
        s_mid: ''
    });

    const handlePSelectChange = (e) => {
        const s_pid = e.target.value;
        setNewData({ ...newData, s_pid: s_pid });
    };

    const handleMSelectChange = (e) => {
        const s_mid = e.target.value;
        setNewData({ ...newData, s_mid: s_mid });
    };

    const handleSave = async () => {
        try{
            await sServices.add(newData);
        } catch(error) {
            console.error(error);
        };

        setNewData({
            s_pid: '',
            s_mid: ''
        });
        fetch();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#FFF8F3] bg-opacity-50">
            <div className="bg-[#FFF8F3] p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4 text-[#405D72]">Add New Set</h2>
                
                {/* Program Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Select Program</label>
                    <select
                        name="s_pid"
                        onChange={handlePSelectChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    >
                        <option value="">Select a program</option>
                        {Object.entries(pName).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Movement Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Select Movement</label>
                    <select
                        name="s_mid"
                        onChange={handleMSelectChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    >
                        <option value="">Select a movement</option>
                        {Object.entries(mName).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
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
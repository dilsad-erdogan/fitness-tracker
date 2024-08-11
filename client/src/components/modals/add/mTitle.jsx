import { useState } from 'react';
import mtServices from '../../../services/movementTitle';

const AddModal = ({ isOpen, onClose, fetch }) => {
    const [newData, setNewData] = useState({
        t_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleSave = async () => {
        try{
            await mtServices.add(newData);
        } catch(error) {
            console.error(error);
        };

        setNewData({
            t_name: ''
        });
        fetch();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#FFF8F3] bg-opacity-50">
            <div className="bg-[#FFF8F3] p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4 text-[#405D72]">Add New Movement Title</h2>

                {/* Name Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Title</label>
                    <input
                        type="text"
                        name="t_name"
                        value={newData.t_name}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    />
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
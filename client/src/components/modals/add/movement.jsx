import { useState } from 'react';
import mServices from '../../../services/movement';

const AddModal = ({ isOpen, onClose, fetch, titles }) => {
    const [newData, setNewData] = useState({
        m_tid: '',
        m_name: '',
        m_description: '',
        m_photo: '',
        m_video: '',
        calorie: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleSelectChange = (e) => {
        const m_tid = e.target.value;
        setNewData({ ...newData, m_tid: m_tid });
    };

    const handleSave = async () => {
        try{
            await mServices.add(newData);
        } catch(error) {
            console.error(error);
        };

        setNewData({
            m_tid: '',
            m_name: '',
            m_description: '',
            m_photo: '',
            m_video: '',
            calorie: ''
        });
        fetch();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#FFF8F3] bg-opacity-50">
            <div className="bg-[#FFF8F3] p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4 text-[#405D72]">Add New Movement</h2>
                
                {/* Title Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Select Title</label>
                    <select
                        name="title"
                        onChange={handleSelectChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    >
                        <option value="">Select a title</option>
                        {Object.entries(titles).map(([id, title]) => (
                        <option key={id} value={id}>
                            {title}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Name Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Name</label>
                    <input
                        type="text"
                        name="m_name"
                        value={newData.m_name}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    />
                </div>
                
                {/* Description Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Description</label>
                    <input
                        type="text"
                        name="m_description"
                        value={newData.m_description}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    />
                </div>

                {/* Photo Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Photo</label>
                    <input
                        type="text"
                        name="m_photo"
                        value={newData.m_photo}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    />
                </div>

                {/* Video Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Video</label>
                    <input
                        type="text"
                        name="m_video"
                        value={newData.m_video}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
                    />
                </div>

                {/* Calorie Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#405D72]">Calorie</label>
                    <input
                        type="text"
                        name="calorie"
                        value={newData.calorie}
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
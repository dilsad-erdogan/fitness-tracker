const Modal = ({ isOpen, onClose, data, setData, onSaveName, onSaveDescription, onSavePhoto, onSaveVideo, onSaveCalorie }) => {
    if (!isOpen) return null;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FFF8F3] bg-opacity-50">
        <div className="bg-[#FFF8F3] p-6 rounded-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-[#405D72]">Edit Movement</h2>
          
          {/* Name Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#405D72]">Name</label>
            <input
              type="text"
              name="m_name"
              value={data.m_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
            />
            <button onClick={onSaveName} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Name</button>
          </div>
          
          {/* Description Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#405D72]">Description</label>
            <input
              type="text"
              name="m_description"
              value={data.m_description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
            />
            <button onClick={onSaveDescription} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Description</button>
          </div>
  
          {/* Photo Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#405D72]">Photo</label>
            <input
              type="text"
              name="m_photo"
              value={data.m_photo}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
            />
            <button onClick={onSavePhoto} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Photo</button>
          </div>
  
          {/* Video Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#405D72]">Video</label>
            <input
              type="text"
              name="m_video"
              value={data.m_video}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
            />
            <button onClick={onSaveVideo} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Video</button>
          </div>

          {/* Calorie Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#405D72]">Calorie</label>
            <input
              type="text"
              name="calorie"
              value={data.calorie}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
            />
            <button onClick={onSaveCalorie} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Calorie</button>
          </div>
  
          <div className="flex justify-end">
            <button onClick={onClose} className="mr-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Close</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
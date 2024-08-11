const Modal = ({ isOpen, onClose, data, setData, onSaveName, onSaveDescription, onSaveDuration, onSaveTime }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFF8F3] bg-opacity-50">
      <div className="bg-[#FFF8F3] p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-[#405D72]">Edit Program</h2>
        
        {/* Name Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#405D72]">Name</label>
          <input
            type="text"
            name="p_name"
            value={data.p_name}
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
            name="p_description"
            value={data.p_description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
          />
          <button onClick={onSaveDescription} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Description</button>
        </div>

        {/* Duration Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#405D72]">Duration</label>
          <input
            type="text"
            name="duration"
            value={data.duration}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
          />
          <button onClick={onSaveDuration} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Duration</button>
        </div>

        {/* Time Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#405D72]">Time</label>
          <input
            type="text"
            name="time"
            value={data.time}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"
          />
          <button onClick={onSaveTime} className="mt-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save Time</button>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
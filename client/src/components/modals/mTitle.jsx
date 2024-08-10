const Modal = ({ isOpen, onClose, onSave, data, setData }) => {
    if (!isOpen) return null;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
  
    const handleSave = () => {
      onSave();
      onClose();
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FFF8F3] bg-opacity-50">
        <div className="bg-[#FFF8F3] p-6 rounded-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-[#405D72]">Edit Movement Title</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#405D72]">Movement Name</label>
            <input type="text" name="t_name" value={data.t_name} onChange={handleChange} className="mt-1 p-2 block w-full border border-[#405D72] rounded-md"/>
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="mr-2 px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-[#405D72] text-[#FFF8F3] rounded-lg">Save</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
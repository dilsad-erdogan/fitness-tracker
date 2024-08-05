import './list.scss';
import { LuListTodo } from "react-icons/lu";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import tServices from '../../services/todoList';
import { useEffect, useState } from 'react';

const Todolist = ({ userid }) => {
  const [list, setList] = useState([]);
  const [newItem, setNewitem] = useState('');

  const fetchList = async() => {
    try{
      const response = await tServices.get(userid);
      setList(response.data);
    } catch(error) {
      console.error(error);
    }
  };

  const changeDone = async(id) => {
    try{
      await tServices.updateDone(id);
      fetchList();
    } catch(error){
      console.error(error);
    }
  };

  const deleteItem = async(id) => {
    try{
      await tServices.deleted(id);
      fetchList();
    } catch(error){
      console.error(error);
    }
  };

  const addItem = async() => {
    const newList = {
      u_id: userid,
      content: newItem
    };

    try{
      await tServices.add(newList);
      fetchList();
    } catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  });

  return (
    <div className='todolist flex flex-col p-7 min-h-[500px] rounded-[20px]'>
      <div className="title">
        <LuListTodo></LuListTodo>
        <span>To-do List</span>
      </div>

      <div className='inputBlock flex items-center my-7 rounded-full'>
        <input className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2' placeholder='Add a new task...' value={newItem} onChange={(e) => {setNewitem(e.target.value)}}></input>
        <button className='border-none rounded-full w-32 h-14 text-lg font-medium cursor-pointer' onClick={() => {addItem(newItem)}}>ADD+</button>
      </div>

      <div className='list'>
        {list.map((item) => (
          <div className='item flex items-center my-3 gap-2' key={item._id}>
            <span className="flex flex-1 items-center cursor-pointer" onClick={() => {changeDone(item._id)}}>
                {item.is_done === true ? (<FiCheckCircle></FiCheckCircle>) : (<FiCircle></FiCircle>)}
                <p className="ml-4 text-[20px]">{item.content}</p>
            </span>

            <RiDeleteBinLine className="w-3.5 cursor-pointer" onClick={() => {deleteItem(item._id)}}></RiDeleteBinLine>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todolist
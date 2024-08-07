import axios from 'axios';
const UP = "http://localhost:3000/userProgram";

const get = async (id) => {
    try{
        const response = await axios.get(`${UP}/get/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching user program:', error);
        throw error;
    }
};

const add = async (upData) => {
    try{
        const response = await axios.post(`${UP}/add`, upData);
        return response.data;
    } catch (error){
        console.error('Error adding user program:', error);
        throw error;
    }
};

const updateName = async (id, name) => {
    try{
        const response = await axios.put(`${UP}/updateName/${id}`, name);
        return response.data;
    } catch (error){
        console.error('Error updating user program:', error);
        throw error;
    }
};

const updateDescription = async (id, desc) => {
    try{
        const response = await axios.put(`${UP}/updateDescription/${id}`, desc);
        return response.data;
    } catch (error){
        console.error('Error updating user program:', error);
        throw error;
    }
};

const updateDuration = async (id, duration) => {
    try{
        const response = await axios.put(`${UP}/updateDuration/${id}`, duration);
        return response.data;
    } catch (error){
        console.error('Error updating user program:', error);
        throw error;
    }
};

const updateTime = async (id, time) => {
    try{
        const response = await axios.put(`${UP}/updateTime/${id}`, time);
        return response.data;
    } catch (error){
        console.error('Error updating user program:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${UP}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting user program:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${UP}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching user program by id:', error);
        throw error;
    }
};

const total = async (id) => {
    try{
        const response = await axios.get(`${UP}/total/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching total:', error);
        throw error;
    }
}

const totalAll = async () => {
    try{
        const response = await axios.get(`${UP}/totalAll`);
        return response.data;
    } catch (error){
        console.error('Error fetching total:', error);
        throw error;
    }
}

const hwServices = {
    get,
    add,
    updateName,
    updateDescription,
    updateDuration,
    updateTime,
    deleted,
    byId, 
    total,
    totalAll
};

export default hwServices;
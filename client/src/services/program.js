import axios from 'axios';
const P = "http://localhost:3000/program";

const get = async () => {
    try{
        const response = await axios.get(`${P}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching program:', error);
        throw error;
    }
};

const add = async (pData) => {
    try{
        const response = await axios.post(`${P}/add`, pData);
        return response.data;
    } catch (error){
        console.error('Error adding program:', error);
        throw error;
    }
};

const updateName = async (id, name) => {
    try{
        const response = await axios.put(`${P}/updateName/${id}`, name);
        return response.data;
    } catch (error){
        console.error('Error updating program name:', error);
        throw error;
    }
};

const updateDescription = async (id, desc) => {
    try{
        const response = await axios.put(`${P}/updateDescription/${id}`, desc);
        return response.data;
    } catch (error){
        console.error('Error updating program desc:', error);
        throw error;
    }
};

const updateDuration = async (id, duration) => {
    try{
        const response = await axios.put(`${P}/updateDuration/${id}`, duration);
        return response.data;
    } catch (error){
        console.error('Error updating program duration:', error);
        throw error;
    }
};

const updateTime = async (id, time) => {
    try{
        const response = await axios.put(`${P}/updateTime/${id}`, time);
        return response.data;
    } catch (error){
        console.error('Error updating program time:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${P}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting program:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${P}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching program by id:', error);
        throw error;
    }
};

const hwServices = {
    get,
    add,
    updateName,
    updateDescription,
    updateDuration,
    updateTime,
    deleted,
    byId
};

export default hwServices;
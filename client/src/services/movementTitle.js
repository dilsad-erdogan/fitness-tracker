import axios from 'axios';
const MT = "http://localhost:3000/movementTitle";

const get = async () => {
    try{
        const response = await axios.get(`${MT}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching movement title:', error);
        throw error;
    }
};

const add = async (mtData) => {
    try{
        const response = await axios.post(`${MT}/add`, mtData);
        return response.data;
    } catch (error){
        console.error('Error adding movement title:', error);
        throw error;
    }
};

const update = async (id, mtData) => {
    try{
        const response = await axios.put(`${MT}/update/${id}`, mtData);
        return response.data;
    } catch (error){
        console.error('Error updating movement title:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${MT}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting movement title:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${MT}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching movement title by id:', error);
        throw error;
    }
};

const mtServices = {
    get,
    add,
    update,
    deleted,
    byId
};

export default mtServices;
import axios from 'axios';
const S = "http://localhost:3000/set";

const get = async () => {
    try{
        const response = await axios.get(`${S}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching set:', error);
        throw error;
    }
};

const add = async (set) => {
    try{
        const response = await axios.post(`${S}/add`, set);
        return response.data;
    } catch (error){
        console.error('Error adding set:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${S}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting set:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${S}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching set by id:', error);
        throw error;
    }
};

const sServices = {
    get,
    add,
    deleted,
    byId
};

export default sServices;
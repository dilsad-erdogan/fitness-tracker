import axios from 'axios';
const HW = "http://localhost:3000/heightWeight";

const get = async () => {
    try{
        const response = await axios.get(`${HW}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching height weight:', error);
        throw error;
    }
};

const add = async (hwData) => {
    try{
        const response = await axios.post(`${HW}/add`, hwData);
        return response.data;
    } catch (error){
        console.error('Error adding hw:', error);
        throw error;
    }
};

const updateHeight = async (id, height) => {
    try{
        const response = await axios.put(`${HW}/updateHeight/${id}`, height);
        return response.data;
    } catch (error){
        console.error('Error updating height:', error);
        throw error;
    }
};

const updateWeight = async (id, weight) => {
    try{
        const response = await axios.put(`${HW}/updateWeight/${id}`, weight);
        return response.data;
    } catch (error){
        console.error('Error updating height:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${HW}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting hw:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${HW}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching hw by id:', error);
        throw error;
    }
};

const hwServices = {
    get,
    add,
    updateHeight,
    updateWeight,
    deleted,
    byId
};

export default hwServices;
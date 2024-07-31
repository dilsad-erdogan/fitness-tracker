import axios from 'axios';
const W = "http://localhost:3000/weeklyCalorie";

const get = async () => {
    try{
        const response = await axios.get(`${W}/get`);
        return response.data;
    } catch(error) {
        console.error('Error fetching:', error);
        throw error;
    }
};

const add = async (wData) => {
    try{
        const response = await axios.post(`${W}/add`, wData);
        return response.data;
    } catch (error){
        console.error('Error adding:', error);
        throw error;
    }
};

const updateMonday = async (id, day) => {
    try{
        const response = await axios.put(`${W}/updateMonday/${id}`, day);
        return response.data;
    } catch (error){
        console.error('Error updating monday:', error);
        throw error;
    }
};

const updateTuesday = async (id, day) => {
    try{
        const response = await axios.put(`${W}/updateTuesday/${id}`, day);
        return response.data;
    } catch(error){
        console.error('Error updating tuesday:', error);
        throw error;
    }
};

const updateWednesday = async (id, day) => {
    try{
        const response = await axios.put(`${W}/updateWednesday/${id}`, day);
        return response.data;
    } catch(error){
        console.error('Error updating tuesday:', error);
        throw error;
    }
};

const updateThursday = async (id, day) => {
    try{
        const response = await axios.put(`${W}/updateThursday/${id}`, day);
        return response.data;
    } catch(error){
        console.error('Error updating tuesday:', error);
        throw error;
    }
};

const updateFriday = async (id, day) => {
    try{
        const response = await axios.put(`${W}/updateFriday/${id}`, day);
        return response.data;
    } catch(error){
        console.error('Error updating tuesday:', error);
        throw error;
    }
};

const updateSaturday = async (id, day) => {
    try{
        const response = await axios.put(`${W}/updateSaturday/${id}`, day);
        return response.data;
    } catch(error){
        console.error('Error updating tuesday:', error);
        throw error;
    }
};

const updateSunday = async (id, day) => {
    try{
        const response = await axios.put(`${W}/updateSunday/${id}`, day);
        return response.data;
    } catch(error){
        console.error('Error updating tuesday:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${W}/delete/${id}`);
        return response.data;
    } catch(error){
        console.error('Error deleting:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${W}/byId/${id}`);
        return response.data;
    } catch(error){
        console.error('Error fetching by id:', error);
        throw error;
    }
};

const wServices = {
    get,
    add,
    updateMonday,
    updateTuesday,
    updateWednesday,
    updateThursday,
    updateFriday,
    updateSaturday,
    updateSunday,
    deleted,
    byId
};

export default wServices;
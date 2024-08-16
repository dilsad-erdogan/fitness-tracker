import axios from "axios";
const G = "http://localhost:3000/goals";

const get = async (id) => {
    try{
        const response = await axios.get(`${G}/get/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching goal:', error);
    }
};

const add = async (goal) => {
    try{
        const response = await axios.post(`${G}/add`, goal);
        return response.data;
    } catch (error) {
        console.error('Error adding goal:', error);
        throw error;
    }
};

const updateContent = async (id, content) => {
    try{
        const response = await axios.put(`${G}/updateContent/${id}`, content);
        return response.data;
    } catch (error){
        console.error('Error updating content:', error);
        throw error;
    }
};

const updateDone = async (id) => {
    try{
        const response = await axios.put(`${G}/updateDone/${id}`);
        return response.data;
    } catch (error){
        console.error('Error updating content:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${G}/delete/${id}`);
        return response.data;
    } catch(error){
        console.error('Error deleted:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${G}/byId/${id}`);
        return response.data;
    } catch(error){
        console.error('Error fetching by id:', error);
        throw error;
    }
};

const gServices = {
    get,
    add,
    updateContent,
    updateDone,
    deleted,
    byId
};

export default gServices;
import axios from "axios";
const T = "http://localhost:3000/todo";

const get = async (id) => {
    try{
        const response = await axios.get(`${T}/get/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching todo:', error);
    }
};

const add = async (list) => {
    try{
        const response = await axios.post(`${T}/add`, list);
        return response.data;
    } catch (error) {
        console.error('Error adding todo list:', error);
        throw error;
    }
};

const updateContent = async (id, content) => {
    try{
        const response = await axios.put(`${T}/update/${id}`, content);
        return response.data;
    } catch (error){
        console.error('Error updating content:', error);
        throw error;
    }
};

const updateDone = async (id) => {
    try{
        const response = await axios.put(`${T}/update/${id}`);
        return response.data;
    } catch (error){
        console.error('Error updating content:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${T}/delete/${id}`);
        return response.data;
    } catch(error){
        console.error('Error deleted:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${T}/byId/${id}`);
        return response.data;
    } catch(error){
        console.error('Error fetching by id:', error);
        throw error;
    }
};

const tServices = {
    get,
    add,
    updateContent,
    updateDone,
    deleted,
    byId
};

export default tServices;
import axios from "axios";
const T = "http://localhost:3000/todo";

const get = async () => {
    try{
        const response = await axios.get(`${T}/get`);
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

const update = async (id, content) => {
    try{
        const response = await axios.put(`${T}/update/${id}`, content);
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
    update,
    deleted,
    byId
};

export default tServices;
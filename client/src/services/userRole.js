import axios from 'axios';
const UR = "http://localhost:3000/userRole";

const get = async () => {
    try{
        const response = await axios.get(`${UR}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching user role:', error);
        throw error;
    }
};

const add = async (urData) => {
    try{
        const response = await axios.post(`${UR}/add`, urData);
        return response.data;
    } catch (error){
        console.error('Error adding user role:', error);
        throw error;
    }
};

const update = async (id, urData) => {
    try{
        const response = await axios.put(`${UR}/update/${id}`, urData);
        return response.data;
    } catch (error){
        console.error('Error updating user role:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${UR}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting user role:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${UR}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching user role by id:', error);
        throw error;
    }
};

const urServices = {
    get,
    add,
    update,
    deleted,
    byId
};

export default urServices;
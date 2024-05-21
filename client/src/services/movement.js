// MT=http://localhost:3000/movementTitle
// P=http://localhost:3000/program
// S=http://localhost:3000/set
// U=http://localhost:3000/user
// UP=http://localhost:3000/userProgram
// UR=http://localhost:3000/userRole
import axios from 'axios';
const M = "http://localhost:3000/movement";

const get = async () => {
    try{
        const response = await axios.get(`${M}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching movement:', error);
        throw error;
    }
};

const add = async (mData) => {
    try{
        const response = await axios.post(`${M}/add`, mData);
        return response.data;
    } catch (error){
        console.error('Error adding movement:', error);
        throw error;
    }
};

const updateDescription = async (id, desc) => {
    try{
        const response = await axios.put(`${M}/updateDescription/${id}`, desc);
        return response.data;
    } catch (error){
        console.error('Error updating desc:', error);
        throw error;
    }
};

const updatePhoto = async (id, photo) => {
    try{
        const response = await axios.put(`${M}/updatePhoto/${id}`, photo);
        return response.data;
    } catch (error){
        console.error('Error updating photo:', error);
        throw error;
    }
};

const updateVideo = async (id, video) => {
    try{
        const response = await axios.put(`${M}/updateVideo/${id}`, video);
        return response.data;
    } catch (error){
        console.error('Error updating video:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${M}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting movement:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${M}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching movement by id:', error);
        throw error;
    }
};

const mServices = {
    get,
    add,
    updateDescription,
    updatePhoto,
    updateVideo,
    deleted,
    byId
};

export default mServices;
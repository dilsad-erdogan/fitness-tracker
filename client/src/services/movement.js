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

const updateName = async (id, name) => {
    try{
        const response = await axios.put(`${M}/updateName/${id}`, name);
        return response.data;
    } catch (error){
        console.error('Error updating desc:', error);
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

const updateCalorie = async (id, calorie) => {
    try{
        const response = await axios.put(`${M}/updateCalorie/${id}`, calorie);
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

const total = async () => {
    try{
        const response = await axios.get(`${M}/total`);
        return response.data;
    } catch (error){
        console.error('Error fetching total:', error);
        throw error;
    }
}

const mServices = {
    get,
    add,
    updateName,
    updateDescription,
    updatePhoto,
    updateVideo,
    updateCalorie,
    deleted,
    byId,
    total
};

export default mServices;
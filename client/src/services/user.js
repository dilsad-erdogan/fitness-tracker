// UP=http://localhost:3000/userProgram
// UR=http://localhost:3000/userRole
import axios from 'axios';
const U = "http://localhost:3000/user";

const get = async () => {
    try{
        const response = await axios.get(`${U}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching user:', error);
        throw error;
    }
};

const updateName = async (id, user) => {
    try{
        const response = await axios.put(`${U}/updateName/${id}`, user);
        return response.data;
    } catch (error){
        console.error('Error updating user name:', error);
        throw error;
    }
};

const updateEmail = async (id, user) => {
    try{
        const response = await axios.put(`${U}/updateEmail/${id}`, user);
        return response.data;
    } catch (error){
        console.error('Error updating user email:', error);
        throw error;
    }
};

const updatePassword = async (id, user) => {
    try{
        const response = await axios.put(`${U}/updatePassword/${id}`, user);
        return response.data;
    } catch (error){
        console.error('Error updating user password:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${U}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting user:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${U}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching user by id:', error);
        throw error;
    }
};

const total = async () => {
    try{
        const response = await axios.get(`${U}/total`);
        return response.data;
    } catch (error){
        console.error('Error fetching total:', error);
        throw error;
    }
}

const uServices = {
    get,
    updateName,
    updateEmail,
    updatePassword,
    deleted,
    byId,
    total
};

export default uServices;
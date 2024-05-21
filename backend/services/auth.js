import axios from 'axios';

const register = async (userData) => {
    try{
        const response = await axios.post(`${process.env.A}/register`, userData);
        return response.data;
    } catch(error) {
        console.error('Register error:', error);
        throw error.response.data;
    }
}
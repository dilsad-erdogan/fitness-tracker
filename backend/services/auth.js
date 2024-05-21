import axios from 'axios';

const register = async (userData) => {
    try{
        const response = await axios.post(`${process.env.A}/register`, userData);
        return response.data;
    } catch(error) {
        console.error('Register error:', error);
        throw error.response.data;
    }
};

const login = async (userData) => {
    try{
        const response = await axios.post(`${process.env.A}/login`, userData);
        return response.data;
    } catch (error){
        console.error('Login error:', error);
        throw error.response.data;
    }
};

const login2FA = async (userData) => {
    try{
        const response = await axios.post(`${process.env.A}/login2FA`, userData);
        return response.data;
    } catch (error){
        console.error('2FA login error:', error);
        throw error.response.data;
    }
};

const verify2FA = async (userData) => {
    try{
        const response = await axios.post(`${process.env.A}/verify2FA`, userData);
        return response.data;
    } catch (error){
        console.error('2FA verify error:', error);
        throw error.response.data;
    }
};

const forgot = async (userData) => {
    try{
        const response = await axios.post(`${process.env.A}/forgot`, userData);
        return response.data;
    } catch (error){
        console.error('Forgot password error:', error);
        throw error.response.data;
    }
};

export default {
    register,
    login,
    login2FA,
    verify2FA,
    forgot
};
import axios from 'axios';

const A = "http://localhost:3000/auth";

const register = async (userData) => {
    try{
        const response = await axios.post(`${A}/register`, userData);
        return response.data;
    } catch(error) {
        console.error('Register error:', error);
        throw error.response.data;
    }
};

const login = async (userData) => {
    try{
        const response = await axios.post(`${A}/login`, userData);
        return response.data;
    } catch (error){
        console.error('Login error:', error);
        throw error.response.data;
    }
};

const login2FA = async (userData) => {
    try{
        const response = await axios.post(`${A}/login2FA`, userData);
        return response.data;
    } catch (error){
        console.error('2FA login error:', error);
        throw error.response.data;
    }
};

const verify2FA = async (userData) => {
    try{
        const response = await axios.post(`${A}/verify2FA`, userData);
        return response.data;
    } catch (error){
        console.error('2FA verify error:', error);
        throw error.response.data;
    }
};

const forgot = async (userData) => {
    try{
        const response = await axios.post(`${A}/forgot`, userData);
        return response.data;
    } catch (error){
        console.error('Forgot password error:', error);
        throw error.response.data;
    }
};

const authService = {
    register,
    login,
    login2FA,
    verify2FA,
    forgot
};

export default authService;
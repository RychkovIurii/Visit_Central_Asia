import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true // Send cookies automatically
});

export default API;

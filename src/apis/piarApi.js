import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL_DEV } = getEnvVariables()

const piarApi = axios.create({
    baseURL: VITE_API_URL_DEV
});

piarApi.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${ token }`
    }

    return config;
}, error => {
    console.error('Error en la respuesta:', error.response);
    return Promise.reject(error);
});

export default piarApi;
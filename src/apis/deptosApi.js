import axios from 'axios';

export const deptosApi = axios.create({
    baseURL: 'https://www.datos.gov.co/resource/xdk5-pm3f.json'
});

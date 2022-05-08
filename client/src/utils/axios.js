import axios from 'axios';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
let headers = {};


if(localStorage.getItem('user')) {
    headers.authorization = `Bearer ${localStorage.getItem('user')}`;
}


const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers
});

export default axiosInstance;
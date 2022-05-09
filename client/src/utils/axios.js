import axios from 'axios';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
let headers = {};


if(localStorage.getItem('user')) {
    //  sets authorization header for token authentication
    headers.authorization = `Bearer ${localStorage.getItem('user')}`;
}

//  creates an axios instance that can used across the application
const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers
});

export default axiosInstance;
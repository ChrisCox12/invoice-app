import axios from 'axios';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
let headers = {};


if(localStorage.getItem('invoice-app-user')) {
    //  sets authorization header for token authentication
    headers.authorization = `Bearer ${localStorage.getItem('invoice-app-user')}`;
}

//  creates an axios instance that can used across the application
const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers
});

//  by using interceptors, ensures that authorization header is set before every request
axiosInstance.interceptors.request.use(
    function(config) {
        config.headers['authorization'] = `Bearer ${localStorage.getItem('invoice-app-user')}`;
        return config;
    }, 
    function(error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;
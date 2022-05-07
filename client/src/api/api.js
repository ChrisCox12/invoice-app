import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL
});
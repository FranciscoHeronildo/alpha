import axios from 'axios';

const api = axios.create({
    baseURL: `https://interview.t-alpha.com.br/api`,
});

const token = localStorage.getItem('token');

// eslint-disable-next-line dot-notation
api.defaults.headers.common['Authorization'] = token;

export default api;
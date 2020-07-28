import axios from 'axios';

const api = axios.create({
    baseURL: "http://foxxassessoria-com.umbler.net/"
});

export default api;

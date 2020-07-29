import axios from 'axios';

const api = axios.create({
    baseURL: "https://foxxassessoria-com.umbler.net/"
});

export default api;

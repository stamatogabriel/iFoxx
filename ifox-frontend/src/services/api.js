import axios from 'axios';

const api = axios.create({
    baseURL: "http://ifoxxacessoria-com.umbler.net/"
});

export default api;

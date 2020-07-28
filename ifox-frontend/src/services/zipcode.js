import axios from 'axios';

const zipcode = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default zipcode;
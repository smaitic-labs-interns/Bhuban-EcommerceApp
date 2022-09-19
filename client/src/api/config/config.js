const axios = require('axios');

const myAxios = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

module.exports =myAxios;
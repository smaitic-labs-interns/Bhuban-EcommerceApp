const axios = require('axios');

const axios_instance = async({endpoints, path={}, query={}, data={}, headers={}}) => {
    
    Object.entries(path).map(data=>{
        endpoints.url= (endpoints.url).replace(`:${data[0]}`, data[1]);
    })
    
    const config={
        method:endpoints.method,
        url:endpoints.url,
        params:query,
        data:data?data:'', // is it necessary to check empty? although initialized empty on args.??
    }
    
    const instance = axios.create({
        baseURL: 'http://localhost:5000/api/',
        headers: {
            'Content-Type': 'application/json',
            "x-api-key":"abcd",
            ...headers,
        },
        timeout: 0,
    });
    const res = await instance(config);
    return res;
}
module.exports =axios_instance;

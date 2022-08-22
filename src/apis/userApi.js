const app = require('../config/apiConfig');
const Service = require('../service/allService');

app.post('/userRegister', async(req, resp) => {
    const data = req.body
    const res = await Service.user.user_register(data.firstName, data.middleName, data.lastName, data.address, data.email, data.password);
    resp.send(res);
});

app.post('/userLogin', async(req, resp) => {
    const data = req.body
    const res = await Service.user.user_signin(data.email, data.password);
    resp.send(res);
})



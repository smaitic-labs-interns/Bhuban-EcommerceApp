const axios_instance = require("../config/config");
const { user } =require("../config/api-endpoints");

const user_signin = async () => {
  try {
    const data = { email: "yadav.bhuban@smaitic.com", password: "bhubany" };
    const res = await axios_instance({endpoints:user.login, data:data})
    console.log(res.data);
  } catch (err) {
    console.log(err)
  }
};

const user_register = async () => {
  try {
    const data= {
        firstName: "Bhuban",
        middleName: "",
        lastName: "Yadav",
        address: "Dhapakhel-23, lalitpur",
        email: "yb.bhuban@smaitic.com",
        password: "bhubany",
    }

    const res = await axios_instance({endpoints:user.register, data:data});
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

// user_signin();
// user_register();

module.exports = { user_signin, user_register };

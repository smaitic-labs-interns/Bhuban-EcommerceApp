const myAxios = require("../config/config");
const { user } =require("../config/api-endpoints");

const user_signin = async () => {
  try {
    const config = {
      ...user.login,
      data: { email: "yadav.bhuban@smaitic.com", password: "bhubany" },
    };
    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const user_register = async () => {
  try {
    const config = {
      ...user.register,
      data: {
        firstName: "Bhuban",
        middleName: "",
        lastName: "Yadav",
        address: "Dhapakhel-23, lalitpur",
        email: "y.bhuban@smaitic.com",
        password: "bhubany",
      },
    };

    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

// user_signin();
// user_register();
// console.log(response.data);
// console.log(response.status);
// console.log(response.statusText);
// console.log(response.headers);
// console.log(response.config);

module.exports = { user_signin, user_register };

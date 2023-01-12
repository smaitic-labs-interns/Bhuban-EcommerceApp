const userData = {
  register: {
    firstName: "bhuban",
    middleName: "Prasad",
    lastName: "Yadav",
    address: "Dhapakhel-23, Lalitpur nepal",
    email: "bhuban@mymail.com",
    password: "bhubany",
  },
  signinRight: {
    email: "bhuban@mymail.com",
    password: "bhubany",
  },
  signinWrong: {
    email: "bhuba@mymail.com",
    password: "bhubanyy",
  },
  signinResponse: {
    firstname: "bhuban",
    middlename: "Prasad",
    lastname: "Yadav",
    address: "Dhapakhel-23, Lalitpur nepal",
    email: "bhuban@mymail.com",
    password: "",
  },
  limitedRight: {
    page: 1,
    limit: 5,
  },
  limitedWrong: {
    page: 100,
    limit: 5,
  },
  userIdWrong: "12345",
};

module.exports = { userData };

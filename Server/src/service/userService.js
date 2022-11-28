const db = require("../repository/dbRepository");
const Schema = require("../models/userModel");
const Validate = require("../utils/validations");

const get_all_users = async () => {
  try {
    const users = await db.user.read_all_user();
    if (users) return users;
  } catch (err) {
    throw err;
  }
};

const get_limited_users = async ({ page, limit }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const users = await db.user.get_limited_users({
      page: newPage,
      limit: newLimit,
    });
    if (users) return users;
  } catch (err) {
    throw err;
  }
};

/* Creating User 
@params
    1) user_data: "User full details", userObject
@returns
    @if(already registered)
        returns login message
    @else if(registered sucessfully)
        returns sucess message
    @else
        returns Error 
*/

const user_register = async (
  firstName,
  middleName,
  lastName,
  address,
  email,
  password
) => {
  try {
    const user = Schema.User({
      firstName,
      middleName,
      lastName,
      address,
      email,
      password,
    });
    if (await db.user.find_user_from_email(user.email)) {
      throw new Error("User Already Registered. Try Login!");
    }
    if (db.user.add_user(user)) {
      return "User Registerd Sucessfully. Try Login";
    }
  } catch (err) {
    throw err;
  }
};

// user_register("Bhuban","Prasad", "Yadav", "Dhapakhel-23", "abcd@smaitic.com", "bhubany")

/* User SignIn
@params
    1) sign_in_details : "username and password", signInObject
@returns
    @if(value matched)
        return login sucess message
    @else
        return Error
*/
const user_signin = async (email, password) => {
  try {
    const { error, value } = await Validate.sign_in_validation({
      email,
      password,
    });
    if (error) throw error;

    const signinDetails = { ...value };
    const response = await db.user.find_user_from_credintals(signinDetails);
    console.log(response);
    if (response) return { ...response, password: "" };
  } catch (err) {
    throw err;
  }
};

// user_signin("abc@smaitic.com", "bhubany");

module.exports = {
  get_all_users,
  get_limited_users,
  user_register,
  user_signin,
};

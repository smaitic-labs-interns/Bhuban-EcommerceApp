const db = require("../repository/dbRepository");
const Schema = require("../models/userModel");
const Validate = require("../utils/validations");

/* 
 * Read all users
@params

@returns
    @if(user exists)
        returns array of all user
    @else
        returns Error 
*/

const get_all_users = async () => {
  try {
    const users = await db.user.read_all_user();
    if (users) return users;
  } catch (err) {
    throw err;
  }
};

/* 
 * Read limited users
@params
    1) page: number, limit:number
@returns
    @if(user exists)
        returns array of users, with next and previous page(optional)
    @else
        returns Error 
*/

const get_limited_users = async ({ page, limit }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const users = await db.user.read_limited_user({
      page: newPage,
      limit: newLimit,
    });
    if (users) return users;
  } catch (err) {
    throw err;
  }
};

/* 
 *Creating User 
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

/**
 * *Update User Details
 * @param {*} userId
 * @param {*} firstName
 * @param {*} middleName
 * @param {*} lastName
 * @param {*} address
 * @param {*} updatedBy
 * @returns success || error message
 */
const update_user = async (
  userId,
  firstName,
  middleName,
  lastName,
  address,
  updatedBy
) => {
  try {
    const user = Schema.UpdateUser({
      firstName,
      middleName,
      lastName,
      address,
    });
    if (!(await db.user.find_user_from_id(userId))) {
      throw new Error(`User doesnot exists on ID: ${userId}`);
    }
    if (db.user.update_user(userId, user, updatedBy)) {
      return `User Updated Sucessfully for ID:${userId}`;
    }
  } catch (err) {
    throw err;
  }
};

const update_user_role = async (userId, role, updatedBy) => {
  try {
    const USER_ROLE = ["superadmin", "admin", "editor", "user"];
    if (!USER_ROLE.includes(role)) {
      throw new Error("Invalid User role");
    }
    if (!(await db.user.find_user_from_id(userId))) {
      throw new Error(`User doesnot exists on ID: ${userId}`);
    }
    if (db.user.update_user_role(userId, role, updatedBy)) {
      return `User Role Updated Sucessfully for ID:${userId}`;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * * Find user using ID
 * @param {*} userId
 * @returns user object ||error message
 */

const get_user_by_id = async (userId) => {
  try {
    const user = await db.user.find_user_from_id(userId);
    if (Object.keys(user).length > 0) {
      return user;
    }
    throw new Error(`User doesnot exists on ID: ${userId}`);
  } catch (err) {
    throw err;
  }
};

/* 
  *User SignIn
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
    if (response) return { ...response, password: "" };
  } catch (err) {
    throw err;
  }
};

const remove_user_by_id = async (userId) => {
  try {
    const user = await db.user.find_user_from_id(userId);
    if (
      Object.keys(user).length > 0 &&
      (await db.user.remove_user_from_id(userId))
    ) {
      return `User removed sucessfully`;
    }
    throw new Error(`User doesnot exists`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  get_all_users,
  get_limited_users,
  user_register,
  update_user,
  get_user_by_id,
  user_signin,
  remove_user_by_id,
  update_user_role,
};

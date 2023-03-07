const bcrypt = require("bcrypt");
const con = require("../config/postGres");

/**
 * * Read all users
 * @returns Array of user objects || error message
 */
const read_all_user = async () => {
  try {
    let users = await con.query("SELECT * FROM users");
    if (users.rowCount !== 0) return users.rows;
    throw new Error(`No User Found`);
  } catch (err) {
    throw err;
  }
};

/**
 * * Read from page(number) to limit(number)
 * @param {page, limit} param0
 * @returns Array of user object || error message
 */

const read_limited_user = async ({ page, limit }) => {
  try {
    let res = await con.query("SELECT COUNT(*) FROM users");
    const length = res.rows[0].count;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if (endIndex < length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    let users = await con.query(
      "SELECT * FROM users ORDER BY createdAt DESC offset $1 LIMIT $2",
      [startIndex, endIndex]
    );
    result.data = users.rows;
    if (users.rowCount !== 0) return result;
    throw new Error(`No User Found`);
  } catch (err) {
    throw err;
  }
};

/**
 * * Create user with user details
 * @param {id, firstname, middlename, lastName, address, email, password} user
 * @returns true || error message
 */
const add_user = async (user) => {
  try {
    const result = await con.query(
      "INSERT INTO users (id, firstname, middlename, lastname, address, email, password, role, createdAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        user.id,
        user.firstName,
        user.middleName,
        user.lastName,
        user.address,
        user.email,
        user.password,
        user?.role,
        new Date().toISOString(),
      ]
    );
    if (result.rowCount > 0) return true;
    throw new Error("Error occurs adding user. Try again Later");
  } catch (err) {
    throw err;
  }
};

/**
 * *Update user Details
 * @param {*} userId
 * @param {firstName, middlename, lastName, address} details
 * @param {userId} updatedBy
 * @returns true || error message
 */

const update_user = async (userId, details, updatedBy) => {
  try {
    const result = await con.query(
      "UPDATE users  SET firstname =$1, middlename=$2, lastname=$3, address=$4, updatedAt=$5, updatedBy=$6  WHERE id=$7 ",
      [
        details.firstName,
        details.middleName,
        details.lastName,
        details.address,
        new Date().toISOString(),
        updatedBy,
        userId,
      ]
    );
    if (result.rowCount > 0) return true;
    throw new Error("Error occurs Updating user. Try again Later");
  } catch (err) {
    throw err;
  }
};

/**
 * *Update user role
 * @param {*} userId
 * @param {*} role
 * @param {*} updatedBy
 * @returns true || error message
 */

const update_user_role = async (userId, role, updatedBy) => {
  try {
    const result = await con.query(
      "UPDATE users  SET role =$1, updatedAt=$2, updatedBy=$3  WHERE id=$4 ",
      [role, new Date().toISOString(), updatedBy, userId]
    );
    if (result.rowCount > 0) return true;
    throw new Error("Error occurs Updating user. Try again Later");
  } catch (err) {
    throw err;
  }
};

/**
 * *Update user display picture
 * @param {*} userId
 * @param {imageurl} image
 * @param {userId} updatedBy
 * @returns true ||error message
 */
const update_user_image = async (userId, image, updatedBy) => {
  try {
    const result = await con.query(
      "UPDATE users  SET imageUrl =$1, imageAltText=$2, updatedAt=$3, updatedBy=$4  WHERE id=$5 ",
      [image, `User DP `, new Date().toISOString(), updatedBy, userId]
    );
    if (result.rowCount > 0) return true;
    throw new Error("Error occurs Updating user image. Try again Later");
  } catch (err) {
    throw err;
  }
};
/**
 * * Find User by Email
 * @param {*} email
 * @returns user Object || error message
 */

const find_user_from_email = async (email) => {
  try {
    let user = await con.query("SELECT * FROM users WHERE email= $1", [email]);
    if (user.rowCount > 0) {
      user.rows[0].password = "";
      return user.rows[0];
    }
    return false;
  } catch (err) {
    throw err;
  }
};

/**
 * * Find user by login credintals
 * @param {email, password} login
 * @returns user object || error message
 */
const find_user_from_credintals = async (login) => {
  try {
    let user = await con.query("SELECT * FROM users WHERE email= $1", [
      login.email,
    ]);
    if (user.rowCount > 0) {
      if (bcrypt.compareSync(login.password, user.rows[0].password)) {
        user.rows[0].password = "";
        return user.rows[0];
      }
    }
    throw new Error(`Invalid login Credintals`);
  } catch (err) {
    throw err;
  }
};

/**
 * *Find User by userId
 * @param {*} userId
 * @returns user object || error message
 */
const find_user_from_id = async (userId) => {
  try {
    let user = await con.query("SELECT * FROM users WHERE id= $1", [userId]);
    if (user.rowCount > 0) {
      user.rows[0].password = "";
      return user.rows[0];
    }
    return false;
  } catch (err) {
    throw err;
  }
};

/**
 * *Remove User by UserId
 * @param {*} userId
 * @returns true || error message
 */
const remove_user_from_id = async (userId) => {
  try {
    let user = await con.query("DELETE FROM users WHERE id= $1", [userId]);
    if (user.rowCount > 0) return true;
    return false;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  read_all_user,
  read_limited_user,
  add_user,
  update_user,
  update_user_image,
  find_user_from_email,
  find_user_from_credintals,
  find_user_from_id,
  remove_user_from_id,
  update_user_role,
};

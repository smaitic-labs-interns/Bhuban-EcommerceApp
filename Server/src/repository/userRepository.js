const bcrypt = require("bcrypt");
const con = require("../config/postGres");

const read_all_user = async () => {
  try {
    let users = await con.query("SELECT * FROM users");
    if (users.rowCount !== 0) return users.rows;
    throw new Error(`No User Found`);
  } catch (err) {
    throw err;
  }
};

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

    if (startIndex < 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    let users = await con.query(
      "SELECT * FROM users ORDER BY createdAt DESC offset $1 LIMIT $2"
    );
    result.data = users.rows;
    if (users.rowCount !== 0) return result;
    throw new Error(`No User Found`);
  } catch (err) {
    throw err;
  }
};

const add_user = async (user) => {
  //add user
  try {
    const result = await con.query(
      "INSERT INTO users (id, firstname, middlename, lastname, address, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        user.id,
        user.firstName,
        user.middleName,
        user.lastName,
        user.address,
        user.email,
        user.password,
      ]
    );
    if (result.rowCount > 0) return true;
    throw new Error("Error occurs adding user. Try again Later");
  } catch (err) {
    throw err;
  }
};

const find_user_from_email = async (email) => {
  //find user from email
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

const find_user_from_credintals = async (login) => {
  // find user from credintals
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

module.exports = {
  read_all_user,
  read_limited_user,
  add_user,
  find_user_from_email,
  find_user_from_credintals,
  find_user_from_id,
};

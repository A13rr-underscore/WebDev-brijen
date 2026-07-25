const pool = require("../database/db");

const createUser = async (full_name, username, email, password) => {
  const result = await pool.query(
    `INSERT INTO users (full_name, username, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [full_name, username, email, password]
  );

  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  return result.rows[0];
};

const findUserById = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id]
  );

  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const deleteUserById = async (user_id) => {
  await pool.query(
    "DELETE FROM users WHERE user_id = $1",
    [user_id]
  );
};

const updateUser = async (user_id, full_name, username, email, profile_image) => {
  const result = await pool.query(

      `
    UPDATE users
      SET full_name=$1,
      username=$2,
      email=$3,
      profile_image=$4
      WHERE user_id=$5
      RETURNING *
      `,

      [
      full_name,
      username,
      email,
      profile_image,
      user_id
      ]

);

  return result.rows[0];
};
const updatePassword = async (user_id, password) => {

  const result = await pool.query(
    `UPDATE users
     SET password = $1
     WHERE user_id = $2
     RETURNING *`,
    [password, user_id]
  );

  return result.rows[0];
};

module.exports = {createUser, findUserByEmail, findUserByUsername, findUserById, getAllUsers, deleteUserById, updateUser,updatePassword};
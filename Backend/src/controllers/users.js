const DB = require("../../configurations/db");
const Formatted = require("./formatted.data");
const TB = "users";

const { hashmd5 } = require("../../configurations/middlefunc");

const getUsers = async (req, res) => {
  console.log("getUsers");
  let data = req.query;
  let sql = `SELECT * FROM ${TB}`;
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      res.json({ status: "Success", users: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });
};
const getUserById = async (req, res) => {
  console.log("getUserById");
  let userId = req.params.userId;

  try {
    let sql = `SELECT * FROM ${TB} WHERE id = ?`;

    const results = await DB.query(sql, {
      type: DB.QueryTypes.SELECT,
      replacements: [userId],
    });

    res.json({ status: "Success", users: results });
  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
};
const postUser = async (req, res) => {
  console.log("postUser");
  const data = req.body;
  console.log(data);
  const pwd = hashmd5(data.password); // Assuming this function is defined and working correctly
  console.log(pwd);
  const currentDate = await Formatted.fomattdDate(); // Assuming this function is defined and working correctly

  const countQuery = `SELECT COUNT(*) as count FROM ${TB} WHERE username = ?`;
  const insertsql = `
    INSERT INTO ${TB} (date, username, password, f_Name, l_Name, role, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  DB.query(countQuery, {
    replacements: [data.username],
    type: DB.QueryTypes.SELECT,
  })
    .then((result) => {
      const count = result[0].count;

      if (count > 0) {
        res.json({
          status: "error",
          text: "This username is already in use!",
          code: "500",
        });
      } else {
        return DB.query(insertsql, {
          replacements: [
            currentDate,
            data.username,
            pwd,
            data.f_Name, // Corrected key case
            data.l_Name, // Corrected key case
            data.role,
            1,
          ],
          type: DB.QueryTypes.INSERT,
        });
      }
    })
    .then(() => {
      res.json({
        status: "Success",
        code: "200",
        message: "User added successfully",
      });
    })
    .catch((err) => {
      res.json({ status: "error", message: err.message, code: "500" }); // Extract the error message
      console.log(err);
    });
};

const putUser = async (req, res) => {
  try {
    console.log("putUser");
    const data = req.body;

    // Assuming you have a 'DB' instance for your database connection
    const sql = `UPDATE ${TB} SET
      f_name = :f_name,
      l_name = :l_name,
      username = :username
    WHERE user_id = :user_id`;

    // Use parameterized queries to prevent SQL injection
    const result = await DB.query(sql, {
      replacements: {
        f_name: data.f_name,
        l_name: data.l_name,
        username: data.username,
        user_id: data.user_id,
      },
      type: DB.QueryTypes.UPDATE,
    });

    // The result from the query should be an array of affected rows
    const count = result[1];

    if (count > 0) {
      console.log(count);
      // Return a 200 status code for a successful update
      res
        .status(200)
        .json({ status: 200, message: "User updated successfully" });
    } else {
      // Return a 404 status code when the user is not found
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    // Return a 500 status code for internal server errors
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  console.log("deleteUser");
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};

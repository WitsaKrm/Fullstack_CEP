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

const patchUser = async (req, res) => {
  console.log("patchUser");
};
const deleteUser = async (req, res) => {
  console.log("deleteUser");
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
};

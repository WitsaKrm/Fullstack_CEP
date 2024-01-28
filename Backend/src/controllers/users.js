const DB = require("../../configurations/db");
const Formatted = require("./formatted.data");
const TB = "users";
const { hashmd5 } = require("../../configurations/middlefunc");
const jwt = require("jsonwebtoken");
const SECRET = "KRMwitsaKrm";

async function comparePasswords(dbPassword, enteredPassword) {
  return dbPassword === enteredPassword;
}
const userRegister = async (req, res) => {
  try {
    console.log("userRegister");
    const data = req.body;
    console.log(data);
    const pwd = hashmd5(data.password); // Assuming this function is defined and working correctly
    console.log(pwd);
    const currentDate = await Formatted.fomattdDate(); // Assuming this function is defined and working correctly

    const countQuery = `SELECT COUNT(*) as count FROM ${TB} WHERE username = ?`;
    const insertsql = `
      INSERT INTO ${TB} (date, username, password, f_name, l_name, role, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await DB.query(countQuery, {
      replacements: [data.username],
      type: DB.QueryTypes.SELECT,
    });

    const count = result[0].count;

    if (count > 0) {
      return res.json({
        status: "error",
        text: "This username is already in use!",
        code: "500",
      });
    } else {
      await DB.query(insertsql, {
        replacements: [
          currentDate,
          data.username,
          pwd,
          data.f_Name,
          data.l_Name,
          data.role,
          1,
        ],
        type: DB.QueryTypes.INSERT,
      });
      return res.json({
        status: "Success",
        code: "200",
        message: "User added successfully",
      });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ status: "Error", message: err.message });
  }
};
const userLogin = async (req, res) => {
  try {
    console.log("userLogin");
    const data = req.body;
    const pwd = hashmd5(data.password);
    const username = data.username;
    console.log(pwd);
    const sql = `SELECT * FROM ${TB} WHERE username = ?`;
    const result = await DB.query(sql, {
      type: DB.QueryTypes.SELECT,
      replacements: [username],
    });

    if (result.length === 0) {
      res.status(404).json({ status: "User not found" });
      return;
    }

    console.log(result[0].password);

    const isLogin = await comparePasswords(result[0].password, pwd);
    console.log({
      user_id: result[0].user_id,
      username: result[0].username,
      fistname: result[0].f_name,
    });
    if (isLogin) {
      const token = jwt.sign(
        {
          user_id: result[0].user_id,
          username: result[0].username,
          firstname: result[0].f_name,
          role: result[0].role
        },
        SECRET,
        { expiresIn: "12h" }
      );
      res.status(200).json({ status: "Success", msg: "Login success", token });
    } else {
      res.status(401).json({ status: "Error",msg:"Password incorrect" });
    }
  } catch (err) {
    console.error("Error Login:", err);
    res.status(500).json({ status: "Error", message: err.message });
  }
};
const authen = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    console.log(decoded);
    res.status(200).json({status:"Verify", decoded})
  } catch(err) {
    res.status(401).json({status:"error", msg: err.message})
  }
};
const getUsers = async (req, res) => {
  try {
    console.log("getUsers");
    const sql = `SELECT * FROM ${TB}`;
    const results = await DB.query(sql, { type: DB.QueryTypes.SELECT });
    res.json({ status: "Success", users: results });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ status: "Error", message: err.message });
  }
};
const getUserById = async (req, res) => {
  try {
    console.log("getUserById");
    const userId = req.params.userId;
    const sql = `SELECT * FROM ${TB} WHERE id = ?`;
    const results = await DB.query(sql, {
      type: DB.QueryTypes.SELECT,
      replacements: [userId],
    });
    res.json({ status: "Success", users: results });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ status: "Error", message: err.message });
  }
};
const getUserByUsername = async (req, res) => {
  try {
    console.log("getUserById");
    console.log(req.params);
    const username = req.params.username;
    const sql = `SELECT * FROM ${TB} WHERE username = ?`;
    const results = await DB.query(sql, {
      type: DB.QueryTypes.SELECT,
      replacements: [username],
    });
    res.json({ status: "Success", user: results });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ status: "Error", message: err.message });
  }
};
const putUser = async (req, res) => {
  try {
    console.log("putUser");
    const data = req.body;
    const sql = `UPDATE ${TB} SET
      f_name = :f_name,
      l_name = :l_name,
      username = :username
    WHERE user_id = :user_id`;

    const result = await DB.query(sql, {
      replacements: {
        f_name: data.f_name,
        l_name: data.l_name,
        username: data.username,
        user_id: data.user_id,
      },
      type: DB.QueryTypes.UPDATE,
    });
    console.log(result);
    const count = result[1];

    if (count > 0) {
      console.log(count);
      return res
        .status(200)
        .json({ status: "Success", message: "User updated successfully" });
    } else {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ status: "Error", message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("deleteUser");
    const data = req.params; // Assuming user_id is part of the URL parameters
    console.log(data);

    // Validate input
    if (!data || !data.user_id) {
      console.log("Invalid input data");
      return res
        .status(400)
        .json({ status: 400, message: "Invalid input data" });
    }

    const ID = parseInt(data.user_id, 10);
    console.log(ID);
    const countQuery = `SELECT COUNT(*) as count FROM ${TB} WHERE user_id = ?`;
    const sql = `DELETE FROM users WHERE user_id = :user_id`;
    console.log(countQuery);
    console.log(sql);
    const result = await DB.query(countQuery, {
      replacements: [data.user_id],
      type: DB.QueryTypes.SELECT,
    });

    const count = result[0].count;
    console.log(count);
    if (count > 0) {
      await DB.query(sql, {
        replacements: {
          user_id: ID,
        },
        type: DB.QueryTypes.DELETE,
      });
      console.log("User deleted successfully");
      return res
        .status(200)
        .json({ status: "Success", message: "User deleted successfully" });
    } else {
      console.log("User not found");
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  userRegister,
  userLogin,
  putUser,
  deleteUser,
  authen,
};

const path = require("path");
const buildApp = require("./src/app");
const {nodeRoutes,userRoutes} =require('./src/routes/routes')
require("dotenv").config({
  path: path.join(__dirname, "src", "configurations", ".env"),
});

const startApp = async () => {
  const appOptions = {
    logger: true,
  };

  const app = buildApp(appOptions);

  const port = process.env.APP_PORT || 9000;
  const host = process.env.DB_HOST;
  nodeRoutes(app);
  userRoutes(app);
  try {
    app.listen(port, host, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    throw error;
  }
};

startApp();

// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const bodyParser = require("body-parser");
// let jsonParser = bodyParser.json();
// const cors = require("cors");
// const path = require("path");
// const dbConnect = require("./src/configurations/db");
// const { hashmd5 } = require("./src/configurations/middlefunc.js");

// const app = express();

// // Parse URL-encoded bodies
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

// app.post("/API/users", jsonParser, function (req, res, next) {
//   console.log(req.body);
//   const data = req.body;
//   console.log(data);
//   const pwd = hashmd5(data.password);

//   const countQuery = "SELECT COUNT(*) as count FROM users WHERE username = ?";
//   const insertsql =
//     "INSERT INTO users (date, username, password, f_Name, l_Name, role, status, to_ken) VALUES (?, ?, ?, ?, ?, ?, ?, 1234)";

//   dbConnect
//     .query(countQuery, {
//       replacements: [data.username],
//       type: dbConnect.QueryTypes.SELECT,
//     })
//     .then((result) => {
//       const count = result[0].count;

//       if (count > 0) {
//         res.json({
//           status: "error",
//           text: "This username is already in use!",
//           code: "500",
//         });
//       } else {
//         return dbConnect.query(insertsql, {
//           replacements: [
//             new Date(),
//             data.username,
//             pwd,
//             data.f_Name,
//             data.l_Name,
//             parseInt(data.role),
//             1,
//           ],
//           type: dbConnect.QueryTypes.INSERT,
//         });
//       }
//     })
//     .then(() => {
//       res.json({
//         status: "Success",
//         code: "200",
//         message: "User added successfully",
//       });
//     })
//     .catch((err) => {
//       res.json({ status: "error", message: err, code: "500" });
//       console.log(err);
//     });
// });
// app.post("/API/login", (req, res, next) => {
//   console.log(req.body);
//   let data = req.body;

//   if (!data) {
//     return res.status(400).json({
//       status: "error",
//       code: "400",
//       text: "Invalid request payload",
//     });
//   }
//   let pwd = hashmd5(data.password);
//   console.log(pwd);
//   console.log(data.username);
//   let selectsql = "SELECT * FROM users WHERE username = ?";

//   dbConnect
//     .query(selectsql, {
//       replacements: [data.username],
//       type: dbConnect.QueryTypes.SELECT,
//     }
//     )

//     .then((results) => {
//       console.log( selectsql);
//       console.log("92",results.length);
//       if (results.length > 0) {
//         const user = results[0];
//         console.log(user.password);
//         if (pwd === user.password) {
//           res.json({
//             status: "Success",
//             code: "200",
//             text: "Login success",
//             user: user.username,
//           });
//         } else {
//           res.json({
//             status: "error",
//             code: "401",
//             text: "username or password is incorrect",
//           });
//         }
//       } else {
//         res.json({
//           status: "error",
//           code: "401",
//           text: "username or password is incorrect",
//         });
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({
//         status: "error",
//         code: "500",
//         text: "Internal Server Error",
//       });
//     });
// });
// app.get("/API/users", (req, res, next) => {
//   let data = req.query;
//   let sql = "SELECT * FROM users";

//   dbConnect
//     .query(sql, { type: dbConnect.QueryTypes.SELECT })
//     .then((results) => {
//       res.json({ status: "Success", users: results });
//     })
//     .catch((err) => {
//       res.json({ status: "Error", message: err });
//     });
// });
// app.get("/API/nodes", (req, res, next) => {
//   const userId = req.query;
//   console.log(userId);
//   let sql = `SELECT * FROM n_devices`;
//   dbConnect
//     .query(sql, { type: dbConnect.QueryTypes.SELECT })
//     .then((results) => {
//       res.json({ status: "Success", nodes: results });
//     })
//     .catch((err) => {
//       res.json({ status: "Error", message: err });
//     });
// });
// app.get("/API/one_sensers/:id", (req, res, next) => {
//   let data = req.query;
//   let id = req.params.id;
//   let sql =
//     "SELECT * FROM data_sensers WHERE nDevices_id = " +
//     id +
//     " ORDER BY id DESC LIMIT 1 ";
//     console.log(sql);
//   dbConnect
//     .query(sql, { type: dbConnect.QueryTypes.SELECT })
//     .then((results) => {
//       res.json({ status: "Success", sensers: results });
//     })
//     .catch((err) => {
//       res.json({ status: "Error", message: err });
//     });
// });
// app.get("/API/sensers/:id",(req,res, next) =>{

// })
// app.get("/API/station/:id",(req,res, next) =>{

// })
// // app.post("/API/adduser", jsonParser, function (req, res, next) {
// //   console.log(req.body);
// //   const data = req.body;
// //   const pwd = hashmd5(data.password);

// //   const countQuery = "SELECT COUNT(*) as count FROM users WHERE username = ?";
// //   const insertsql =
// //     "INSERT INTO users (date, username, password, f_Name, l_Name, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)";

// //   dbConnect
// //     .query(countQuery, {
// //       replacements: [data.username],
// //       type: dbConnect.QueryTypes.SELECT,
// //     })
// //     .then((result) => {
// //       const count = result[0].count;

// //       if (count > 0) {
// //         res.json({
// //           status: "error",
// //           text: "This username is already in use!",
// //           code: "500",
// //         });
// //       } else {
// //         return dbConnect.query(insertsql, {
// //           replacements: [
// //             new Date(),
// //             data.username,
// //             pwd,
// //             data.f_Name,
// //             data.l_Name,
// //             1,
// //             1,
// //           ],
// //           type: dbConnect.QueryTypes.INSERT,
// //         });
// //       }
// //     })
// //     .then(() => {
// //       res.json({
// //         status: "Success",
// //         code: "200",
// //         message: "User added successfully",
// //       });
// //     })
// //     .catch((err) => {
// //       res.json({ status: "error", message: err, code: "500" });
// //       console.log(err);
// //     });
// // });

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// app.listen(9000, () => {
//   console.log("Server started running on port 9000");
// });

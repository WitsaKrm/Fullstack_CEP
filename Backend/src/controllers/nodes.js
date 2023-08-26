const DB = require("../../configurations/db");
const TB_N = "n_devices";
// const TB_N = "node";
// const TB_STT = "station";
// const TB_S = "data_sensers";
const TB_S = "data_sensers";

const getNodes = async (req, res) => {
  console.log("getNodes");
  let sql = `SELECT * FROM ${TB_N}`;
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      res.json({ status: "Success", nodes: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });
};
const getStation = async (req, res) => {
  console.log("getStation");
  let sql = `SELECT * FROM ${TB_STT}`;
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      res.json({ status: "Success", nodes: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });
};
const getSenser = async (req, res) => {
  console.log("getSenser");
  const nodeId = req.params.nodeId;
  console.log(nodeId);
  let sql = `SELECT * FROM ${TB_S} WHERE nDevices_id = ${nodeId} ORDER BY id DESC LIMIT 1 `;
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      res.json({ status: "Success", senser: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });
};
const getAllSenserData = async (req, res) => {
  console.log("getAllSenserData");
  const nodeId = req.params.nodeId;
  const data = req.params.data;
  console.log(data, nodeId);
  let sql = `SELECT * FROM ${TB_S} WHERE nDevices_id = ${nodeId}`;
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      res.json({ status: "Success", chart: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });

};

module.exports = {
  getNodes,
  getStation,
  getSenser,
  getAllSenserData
};

const DB = require("../../configurations/db");
// const TB_N = "n_devices";
const TB_N = "node";
const TB_STT = "station";
const TB_SS = "data_node";

const getNodes = async (req, res) => {
  console.log("getNodes");
  let sql = `SELECT * FROM ${TB_N}`;
  DB.query(sql, { type: DB.QueryTypes.SELECT })
  
    .then((results) => {
      console.log("nodes : ",results); // This logs the query results
      res.json({ status: "Success", nodes: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });
};
const getStation = async (req, res) => {
  console.log("getStation"); // This logs a message when the function is executed
  let sql = `SELECT * FROM ${TB_STT}`;
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      console.log("stations : ",results); // This logs the query results
      res.json({ status: "Success", stations: results });
    })
    .catch((err) => {
      console.log(err); // This logs any errors that occur
      res.json({ status: "Error", message: err });
    });
};


const getSenser = async (req, res) => {
  const nodeId = req.params.nodeId;
  console.log("getSenser", nodeId);
  let sql = `SELECT * FROM ${TB_SS} WHERE node_id = ${nodeId} ORDER BY data_id DESC LIMIT 1 `;
  console.log(sql);
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      res.json({ status: "Success", senser: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });
};
const getAllSenserChartData = async (req, res) => {
  console.log("getAllSenserData",req.params.nodeId);
  const nodeId = req.params.nodeId;
  const data = req.params.data;
  let sql = `SELECT * FROM ${TB_SS} WHERE node_id = ${nodeId}`;
  console.log(sql);
  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      res.json({ status: "Success", chart: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });

};
const getChartData = async (req, res) => {
  console.log("getAllSenserData",req.params.nodeId);
  const nodeId = req.params.nodeId;
  const data = req.params.data;
  let sql = `SELECT ${data} FROM ${TB_SS} WHERE node_id = ${nodeId} `;
  console.log(sql);

  DB.query(sql, { type: DB.QueryTypes.SELECT })
    .then((results) => {
      console.log("oneChart : ",results); // This logs the query results

      res.json({ status: "Success", oneChart: results });
    })
    .catch((err) => {
      res.json({ status: "Error", message: err });
    });

};

module.exports = {
  getNodes,
  getStation,
  getSenser,
  getAllSenserChartData,
  getChartData
};

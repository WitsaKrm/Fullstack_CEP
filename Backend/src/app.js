const line = require("@line/bot-sdk");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { lineRoutes }= require('./routes/routes')

const buildApp = (options = {}) => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("./public"));
  lineRoutes(app);
  return app;
};

module.exports = buildApp;

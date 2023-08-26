const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const buildApp = (options = {}) => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('./public'));

  return app;
};

module.exports = buildApp;

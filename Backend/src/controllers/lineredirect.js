const line = require("../controllers/line");
const path = require("path");

const redirect = async (req, res) => {
  console.error("line redirect");
  try {
    await line.lToken(req.query.code, req.query.state);
    console.log("00000");
    res.sendFile(path.join(__dirname, "../../views", "line-connected.html"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const notify = async (req, res) => {
  try {
    await line.sendLineNotify(req.body.message, req.body.token);
    return res.status(200).send({ message: "Notify Successfully." });
  } catch (error) {
    return res.json({ error: error.response.data.message });
  }
};
module.exports = {
  redirect,
  notify,
};

const axios = require("axios");
const qs = require("qs");

const CLIENT_ID = "PvjrBLwlp118pmtfbi8Oii";
const CLIENT_SECRET = "RlVtNri8oUY0U37Bga2O7EM2FjIeGhZEh2lLWuY6qgy";
const LINE_API_URI = "https://notify-bot.line.me/oauth/token";
const CALLBACK_URI = "http://localhost:9000/line/redirect";

const lToken = async (code, username) => {
  console.log("get Line Token");
  try {
    const res = await axios.post(
      LINE_API_URI,
      qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: CALLBACK_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    ).then((r) => {
      console.log('Get Token : ', r.data.access_token);
      return r.data;
    });

    // Logic process to save or update access token

  } catch (error) {
    console.error('Error : ', error.response.data.message);
    return error;
  }
};
const sendLineNotify = async ( message, accessToken) => {
  // const ACCESS_TOKEN = "ZvzuKXkbWEJNlrBLwjM71XLthVmhor7wdmy5wpxl4y4";
  // const orderMessage = "halohalo";
  console.log("12346");
  const LINE_NOTIFY_URI = "https://notify-api.line.me/api/notify";

  const header = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + accessToken,
  };
  console.log(message ," ", accessToken);
  await axios
    .post(LINE_NOTIFY_URI, qs.stringify({ message }), { headers : header })
    .then((response) => {
      console.log("Status:", response.status);
      console.log("Data:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error.response.status);
      console.error("Message:", error.response.data.message);
    });
};


module.exports = {
  lToken,
  sendLineNotify
};


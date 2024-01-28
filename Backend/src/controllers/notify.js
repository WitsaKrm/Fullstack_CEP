const axios = require("axios");
const qs = require("qs");

// const ACCESS_TOKEN = "ZvzuKXkbWEJNlrBLwjM71XLthVmhor7wdmy5wpxl4y4";
// const orderMessage = "ahfksjbfgankbgvniame";

// exports.sendLineNotify = async (accessToken, message) => {
//   const ACCESS_TOKEN = "ZvzuKXkbWEJNlrBLwjM71XLthVmhor7wdmy5wpxl4y4";
//   const orderMessage = "halohalo";
//   console.log("12346");
//   const LINE_API_URI = "https://notify-api.line.me/api/notify";

//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Authorization": "Bearer " + ACCESS_TOKEN,
//   };
//   await axios
//     .post(LINE_API_URI, qs.stringify({ orderMessage }), { headers })
//     .then((response) => {
//       console.log("Status:", response.status);
//       console.log("Data:", response.data);
//     })
//     .catch((error) => {
//       console.error("Error:", error.response.status);
//       console.error("Message:", error.response.data.message);
//     });
// };

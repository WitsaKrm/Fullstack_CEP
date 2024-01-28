const axios = require('axios');
// Example usage
const ACCESS_TOKEN = 'ynrOGN5HcFH5rzMHC3HlwsDMllz2vmjhHPlGVMeW21W';
const orderMessage = 'Your order #12345 has been delivered';



const sendLineNotify = (accessToken, message) => {
  const LINE_API_URI = 'https://notify-api.line.me/api/notify';

  const headers = {
    'Authorization': 'Bearer ' + accessToken,
  };

  axios.post(LINE_API_URI, { message }, { headers })
  .then(response => {
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.status);
    console.error('Message:', error.response.data.message);
  });
};




sendLineNotify(ACCESS_TOKEN, { message: 'orderMessage' });
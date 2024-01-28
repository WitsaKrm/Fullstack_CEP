const axios = require('axios');
const url = require('url');
const querystring = require('querystring');

const CLIENT_ID = 'PvjrBLwlp118pmtfbi8Oii';
const CLIENT_SECRET = 'your_client_secret'; // Replace with your actual CLIENT_SECRET
const LINE_API_URI = 'https://notify-bot.line.me/oauth/token';
const CALLBACK_URI = 'http://localhost:8000/callback'; // Replace with your actual CALLBACK_URI

// Extract query parameters from the URL
// const sampleUrl = 'http://localhost:8000/callback?code=tNVHhUHmooVp8x6rNnSDDj&state=abcdef123456';
const parsedUrl = url.parse(sampleUrl);
console.log(parsedUrl);
const queryParams = querystring.parse(parsedUrl.query);
console.log(queryParams.code);
const fields = {
  grant_type: 'authorization_code',
  code: queryParams.code,
  redirect_uri: CALLBACK_URI,
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
};

axios.post(LINE_API_URI, null, { params: fields.code })
  .then(response => {
    console.log('Access Token Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

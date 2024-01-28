const querystring = require('querystring');

const CLIENT_ID = 'PvjrBLwlp118pmtfbi8Oii'; 
const LINE_API_URI = 'https://notify-bot.line.me/oauth/authorize?';
const CALLBACK_URI = 'http://localhost:3000';


const crypto = require('crypto');

const generateState = () => {
  const stateLength = 16;
  return crypto.randomBytes(stateLength).toString('hex');
};

const randomState = generateState();
const queryStrings = {
    'response_type': 'code',
    'client_id': CLIENT_ID,
    'redirect_uri': CALLBACK_URI,
    'scope': 'notify',
    'state': randomState
};

const queryString = LINE_API_URI + querystring.stringify(queryStrings);
console.log(queryString);

// console.log(`<a href="${queryString}">Register</a>`); //ไปหน้าไลน์Login

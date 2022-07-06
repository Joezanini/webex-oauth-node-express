require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(express.static('static'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/auth', (req, res) => {
  res.redirect(
    `https://webexapis.com/v1/authorize?client_id=Cb12c697d6f8d068fa8c106e3389f867edb7f55366a08864015f13ed3818698ba&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgranted&scope=spark%3Aall%20spark%3Akms&state=set_state_here`,
  );
});

app.get('/granted', ({ query: { code } }, res) => {
  const body = {
    grant_type : 'authorization_code',
    client_id: process.env.WEBEX_CLIENT_ID,
    client_secret: process.env.WEBEX_SECRET,
    code : code,
    redirect_uri : 'http://localhost:3000/granted'
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://webexapis.com/v1/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      // eslint-disable-next-line no-console
      console.log('My token:', token);
      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

app.listen(3000);
console.log('App listening on port 3000');

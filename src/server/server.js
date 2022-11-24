const express = require('express');
const app = express();

app.use(express);

const users = [];

app.get('/home', (req, res) => {
  res.send('Works');
});

app.listen(3000, () => {
  console.log('server running');
});

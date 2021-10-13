const express = require('express');
const path = require('path');

const app = express();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use(express.static(path.join(__dirname, '/client/style.css')));
app.use(express.static(path.join(__dirname, '/client/app.js')));

const messages = [];

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
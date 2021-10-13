const express = require('express');
const path = require('path');
const PORT = 5000;
// const cors = require('cors');
const app = express();

const axios = require('axios');
// const config = require('../config.js');

// app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  console.log('Endpoint Test Success!');
  res.sendStatus(200);
})

//add game to cabinet

//search games in cabinet

//add game to wishlist

//search games in wishlist

//GET games based on search criteria

app.listen(PORT, () => {
  console.log(`Game Cabinet listening at localhost:${PORT}`);
});
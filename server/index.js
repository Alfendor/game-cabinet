const express = require('express');
const path = require('path');
const PORT = 5000;
// const cors = require('cors');
const app = express();

const axios = require('axios');
// const config = require('../config.js');

const db = require('../database/index.js');

// app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  console.log('Endpoint Test Success!');
  res.sendStatus(200);
})

// //GET games from BGG based on search criteria // NOT NECESSARY: DO IT IN THE APP
// app.get('/bgg', (req, res) =>)

//add game to cabinet
app.post('/cabinet', (req, res) => {
  db.addGame(req.params, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(data);
    }
  })
})

//search games in cabinet for suggestions
app.get('/cabinet', (req, res) => {
  console.log(req.query);
  db.findGame(req.query, (err, data) => {
    if (err) {
      console.error('error getting games from db:', err);
      res.status(400).send(err);
    } else {
      console.log('got games from db!');
      res.status(200).send(data);
    }
  });
});

//retrieve list of mechanics
app.get('/cabinet/mechanics', (req, res) => {
  console.log('mechanics request recd!');
  db.getMechanics((err, data) => {
    if (err) {
      console.error('error getting mechanics:', err);
      res.status(400).send(err);
    } else {
      console.log('got mechanics list!');
      res.status(200).send(data);
    }
  })
});

//retrieve list of themes
app.get('/cabinet/themes', (req, res) => {
  console.log('themes request recd!');
  db.getThemes((err, data) => {
    if (err) {
      console.error('error getting themes:', err);
      res.status(400).send(err);
    } else {
      console.log('got themes list!');
      res.status(200).send(data);
    }
  })
});

//retrieve list of equipment
app.get('/cabinet/equipment', (req, res) => {
  console.log('equipment request recd!');
  db.getEquipment((err, data) => {
    if (err) {
      console.error('error getting equipment:', err);
      res.status(400).send(err);
    } else {
      console.log('got equipment list!');
      res.status(200).send(data);
    }
  })
});

/** IMPLEMENT LATER */
//add game to wishlist

//search games in wishlist


app.listen(PORT, () => {
  console.log(`Game Cabinet listening at localhost:${PORT}`);
});
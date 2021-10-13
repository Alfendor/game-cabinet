const { Pool, Client } = require('pg');

const credentials = {
  host: 'localhost',
  port: 5432,
  user: 'derek',
  password: '',
  database: 'larek-games',
  max: 20
};

const pool = new Pool(credentials);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to db: ', err);
  } else {
    console.log('Connected to db!')
  }
});

const findGame = (params, callback) => {
  var columns = [];
  var values = [];
  var query = `SELECT * FROM games
    WHERE
      $1 BETWEEN minplayers AND maxplayers
    AND
      playingtime <= $2
    AND
      age <= $3
    AND
      cooperative = $4`;

  pool.query(query, values, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
}
/**figure out the query here


*/



const addGame = (params, callback) => {
  var query = ``;
  var values = [];

  pool.query(query, values, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
}

pool.connect()
  .then(() => console.log('connected to database!'))
  .catch((err) => console.error(err));

module.exports = {
  pool,
  findGame,
  addGame
}
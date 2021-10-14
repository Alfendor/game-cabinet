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
  var query = `SELECT * FROM games`;
  var filters = [];
  if (params.players > 0) {
    filters.push(`${params.players} BETWEEN minplayers AND maxplayers`);
  }
  if (params.age > 0) {
    filters.push(`minage <= ${params.age}`);
  }
  if (params.time > 0) {
    filters.push(`playingtime <= ${params.time}`);
  }
  if (params.cooperative) {
    filters.push(`cooperative = ${params.cooperative}`);
  }
  if (params.theme) {
    filters.push(`()`)
  }
  if (filters.length >= 1) {
    query += ' WHERE ';
    query += filters.join(' AND ');
  }
  console.log(params);
  console.log(query);

  pool.query(query, (err, res) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
}
/**figure out the query here
SELECT * FROM games
  WHERE
    4 BETWEEN minplayers AND maxplayers
  AND
    playingtime <= 60
  AND
    minage <= 12
  AND
    cooperative = true
  AND
    id IN (SELECT game_id FROM game_themes WHERE theme_id = (SELECT id FROM themes WHERE name LIKE '%Harry Potter%'));
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

/**
INSERT INTO
  game_themes (game_id, theme_id)
VALUES
  (
    5,
    (SELECT id FROM themes WHERE name LIKE 'Hist%')
  ),
  (
    5,
    (SELECT id FROM themes WHERE name = 'Trains')
  ),
  (
    5,
    (SELECT id FROM themes WHERE name LIKE 'United States%')
  );
 */

pool.connect()
  .then(() => console.log('connected to database!'))
  .catch((err) => console.error(err));

module.exports = {
  pool,
  findGame,
  addGame
}
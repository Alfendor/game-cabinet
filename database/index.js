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
    filters.push(`id IN (SELECT game_id FROM game_themes WHERE theme_id = (SELECT id FROM themes WHERE name LIKE '%${params.theme}%'))`)
  }
  if (params.mechanics) {
    filters.push(`id IN (SELECT game_id FROM game_mechanics WHERE mechanic_id = (SELECT id FROM mechanics WHERE name LIKE '%${params.mechanics}%'))`)
  }
  if (params.equipment) {
    filters.push(`id IN (SELECT game_id FROM game_equipment WHERE equipment_id = (SELECT id FROM equipment WHERE name LIKE '%${params.equipment}%'))`)
  }

  if (filters.length >= 1) {
    query += ' WHERE ';
    query += filters.join(' AND ');
  }

  // console.log(params);
  // console.log(query);

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
    id IN (SELECT game_id FROM game_themes WHERE theme_id = (SELECT id FROM themes WHERE name LIKE '%Harry Potter%'))
  AND
    id IN (SELECT game_id FROM game_mechanics WHERE mechanic_id = (SELECT id FROM mechanics WHERE name LIKE '%Deck%Building%'))
  AND
    id IN (SELECT game_id FROM game_equipment WHERE equipment_id = (SELECT id FROM equipment WHERE name LIKE '%Cards%'));
*/

//GET LIST OF MECHANICS FOR DROP-DOWN MENU
const getMechanics = (callback) => {
  var query = `SELECT * FROM mechanics`;

  pool.query(query, (err, res) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
}

//GET LIST OF THEMES FOR DROP-DOWN MENU
const getThemes  = (callback) => {
  var query = `SELECT * FROM themes`;

  pool.query(query, (err, res) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
}

//GET LIST OF EQUIPMENT FOR DROP-DOWN MENU
const getEquipment  = (callback) => {
  var query = `SELECT * FROM equipment`;

  pool.query(query, (err, res) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
}


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
    12,
    (SELECT id FROM themes WHERE name LIKE '%TV%')
  ),
  (
    12,
    (SELECT id FROM themes WHERE name LIKE '%Friends%')
  );

INSERT INTO
  game_mechanics (game_id, mechanic_id)
VALUES
  (
    12,
    (SELECT id FROM mechanics WHERE name LIKE '%Trivia%')
  );

INSERT INTO
  game_equipment (game_id, equipment_id)
VALUES
  (
    12,
    (SELECT id FROM equipment WHERE name LIKE '%Card%')
  ),
  (
    12,
    (SELECT id FROM equipment WHERE name LIKE '%Board%')
  ),
  (
    12,
    (SELECT id FROM equipment WHERE name LIKE '%Wheel%')
  );
 */

pool.connect()
  .then(() => console.log('connected to database!'))
  .catch((err) => console.error(err));

module.exports = {
  pool,
  findGame,
  addGame,
  getMechanics,
  getThemes,
  getEquipment
}
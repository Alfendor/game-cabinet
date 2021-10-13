const { Pool, Client } = require('pg');

const credentials = {
  host: 'localhost',
  port: 5432,
  user: 'derek',
  password: '',
  database: 'larek-games';
  max: 20
};

const pool = new Pool(credentials);

pool.connect()
  .then(() => console.log('connected to database!'))
  .catch((err) => console.error(err));

module.exports = {
  query(text, params, callback) {
    const results = await pool.query(text, params, callback);
    return results;
  }
}
const { Pool, types } = require("pg");

types.setTypeParser(1114, (value) => value);

// pg lit PGHOST, PGPORT, PGUSER, PGPASSWORD et PGDATABASE dans l'environnement
const pool = new Pool();

pool.on("error", (err) => {
  console.error("PostgreSQL :", err.message);
});

module.exports = pool;

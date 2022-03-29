const { database } = require("pg/lib/defaults");

const Pool = require("pg").Pool;
const pool = new Pool({

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: "localhost",
    database: "radio"
})

module.exports = pool;
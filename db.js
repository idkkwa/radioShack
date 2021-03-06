const { database } = require("pg/lib/defaults");
const { Client } = require('pg')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'encode',
}

function getUsers( cb ) {
    const client = new Client(options)
    client.connect()

}
module.exports = getUsers;
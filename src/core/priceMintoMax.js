require('dotenv').config()
const { Client } = require('pg')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'radio',

}

function getMintoMax( cb ) {
    const client = new Client(options)
    client.connect()
    client.query("SELECT brand_name, product_name, price FROM radioshack WHERE price = (SELECT MAX(price) from radioshack)", (err, res) => {
        if (err) throw err;
        console.log(res)
        cb(res.rows)
    })
}

module.exports = {
    getMintoMax,
    
}
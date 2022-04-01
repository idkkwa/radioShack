require('dotenv').config()
const { Client } = require('pg')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'radio',

}

function getAllProducts( cb ) {
    const client = new Client(options)
    client.connect()
    client.query("SELECT * from radioshack", (err, res) => {
        if (err) throw err;
        console.log(res)
        cb(res.rows)
    })
}
function getAppleProducts( cb ) {
    const client = new Client(options)
    client.connect()
    client.query("SELECT * FROM radioshack where brand_name = 'Apple'", (err, res) => {
        if (err) throw err;
        console.log(res)
        cb(res.rows)
    })
}
function getDellProduct( cb ) {
    const client = new Client(options)
    client.connect()
    client.query("SELECT * FROM radioshack where brand_name = 'Dell'", (err, res) => {
        if (err) throw err;
        console.log(res)
        cb(res.rows)
    })
}

function getRSProducts( cb ) {
    const client = new Client(options)
    client.connect()
    client.query("SELECT * FROM radioshack where brand_name = 'RadioShack'", (err, res) => {
        if (err) throw err;
        console.log(res)
        cb(res.rows)
    })
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
    getAllProducts,
    getAppleProducts,
    getDellProduct,
    getRSProducts,
    getMintoMax
}
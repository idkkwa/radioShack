const express = require('express');
const bcrypt = require("bcrypt");
require('dotenv').config()
const cors = require('cors');

const getAllProducts = require('./src/routes/getAllProducts')
const getSpecificProducts = require('./src/routes/getSpecificProducts')
const getMintoMax = require('./src/routes/getMintoMax');
const getDellProduct = require('./src/routes/getDellProduct')
const getRSProducts = require('./src/routes/getRSProduct')
const path = require("path");
const bodyParser = require("body-parser");
const { pool } = require('./db');
const { Client } = require('pg');
const getAllUsers = require('./src/routes/getAllUsers');
const db = require('./db');
const getOneUser = require('./src/routes/getOneUser');
const app = express();
// HTML JS AND CSS are files that are static so each of them have to be on the server in order for them to be read

app.use(express.static('public'));
app.use(bodyParser());
app.use(cors());

const api = require('./src/core/users');

app.get('/api/v1/user/', api.getUsers);
app.get('/api/v1/user/:id', api.getUserById);
app.post('/api/v1/user/', api.addUser);
app.put('/api/v1/user/:id', api.updateUser);
app.delete('/api/v1/user/:id', api.deleteUser);
app.post('/api/v1/login', api.loginUser);
app.get('/api/v1/getlogin', api.getCount);


app.get('/api/v1/products/', getAllProducts)
app.get('/api/v1/apple/', getSpecificProducts)
app.get('/api/v1/dell/', getDellProduct)
app.get('/api/v1/rs/', getRSProducts)
app.get('/api/v1/price/', getMintoMax)


// Used as a last resort if the user enters an invalid address
app.get('*', (request, response) => {
    response.json('The page has not been found')
})

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
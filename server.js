const express = require('express');
const bcrypt = require("bcrypt");
require('dotenv').config()

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

const api = require('./src/core/users');

app.get('/user/', api.getUsers);
app.get('/user/:id', api.getUserById);
app.post('/user/', api.addUser);
app.put('/user/:id', api.updateUser);
app.delete('/user/:id', api.deleteUser);

app.get('/api/v1/products/', getAllProducts)
app.get('/api/v1/apple/', getSpecificProducts)
app.get('/api/v1/dell/', getDellProduct)
app.get('/api/v1/rs/', getRSProducts)
app.get('/api/v1/price/', getMintoMax)
app.get('/api/v1/users', getAllUsers)

app.get('/api/v1/user/:id', getOneUser);

app.post('/register', async (request, response) => {
    try {
        // Res is used to the send stuff to the browser
        // Req is used to recieve stuff from the client
        //const {username, password} = request.body;
        const hash = await bcrypt.hash(request.body.password, 10);
        const result = await db.query("INSERT INTO login (user_name, pass_word) VALUES ($1,$2) RETURNING *",
        [request.body.username, hash]);
        //('login').insert({username:username, hash:hash});
        return res.json(result.rows[0]);
        //response.status(200).send('It works!');
    } 
    
    catch(e) {
        console.log(e);
        response.status(500).send('Something happened!')
    }
});

app.post('/login', async (request, response) => {
    try {
        const {username, password} = request.body;
        const user = await db('login').where({username: username});
        if(user){
            const validPass = await bcrypt.compare(password, user.hash);
            if(validPass){
                response.status(200).json('Valid!');
            }
            else{
                response.json("Wrong");
            }
        }
        else{
            response.status(404).json("User not found");
        }
    } 
    
    catch(e) {
        console.log(e);
        response.status(500).send('Something happened!')
    }
})

// Used as a last resort if the user enters an invalid address
app.get('*', (request, response) => {
    response.json('The page has not been found')
})

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
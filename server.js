const express = require('express');
require('dotenv').config()

const getAllProducts = require('./src/routes/getAllProducts')
const getSpecificProducts = require('./src/routes/getSpecificProducts')
const getMintoMax = require('./src/routes/getMintoMax');
const getDellProduct = require('./src/routes/getDellProduct')
const getRSProducts = require('./src/routes/getRSProduct')
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
// HTML JS AND CSS are files that are static so each of them have to be on the server in order for them to be read

app.use(express.static('public'));
app.use(bodyParser());

app.get('/api/v1/products/', getAllProducts)
app.get('/api/v1/apple/', getSpecificProducts)
app.get('/api/v1/dell/', getDellProduct)
app.get('/api/v1/rs/', getRSProducts)
app.get('/api/v1/price/', getMintoMax)

app.post('/user', (request, response) => {
    // Res is used to the send stuff to the browser
    // Req is used to recieve stuff from the client
    console.log("Request: ", request.body);
    const username = request.body.username
    const password = request.body.address

    const user = {
        username:username,
        password:password
    };

    response.json({msg: "Here is your information:", data: user})
})

app.post('/testProduct', (request, response) => {
    // Res is used to the send stuff to the browser
    // Req is used to recieve stuff from the client
    console.log("Request: ", request.body);
    const products = request.body.products

    const testProduct = {
        products:products
    };

    if(products == 'Apple'){
        
        response.json({msg: "You were looking for ", testProduct})
    }
    else
        response.json({msg: "No data here"})
})
// Used as a last resort if the user enters an invalid address
app.get('*', (request, response) => {
    response.json('The page has not been found')
})

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
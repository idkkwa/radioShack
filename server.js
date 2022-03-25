const express = require('express');
require('dotenv').config()

const getAllProducts = require('./src/routes/getAllProducts')
const getSpecificProducts = require('./src/routes/getSpecificProducts')

const app = express();

app.get('/api/v1/products/', getAllProducts)
app.get('/api/v1/:brand_name', getSpecificProducts)

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
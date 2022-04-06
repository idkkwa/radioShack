require('dotenv').config()
const { request } = require('express');
const { Client } = require('pg')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'radio',

}

const getAllProducts = (request, response) => {
    const client = new Client(options)
    client.connect()
    client.query('SELECT * FROM radioshack', (err, res) => {
          response.status(200).json(res.rows);
          if(err) throw err;
        });
};


const getProductById = (request, response) => {
    const client = new Client(options)
    client.connect()
    const id = parseInt(request.params.id);
        client.query('SELECT * FROM radioshack WHERE id = $1', [id], (err, results) => {
            response.status(200).json(results.rows);
            if(err) throw err;
        });

};

const getProductByName = ( request, response ) => {
    const brandName = request.params.brand_name;
    const client = new Client(options)
    client.connect()
    client.query('SELECT * FROM radioshack WHERE brand_name = $1', [brandName], (err, results) => {
        response.status(200).json(results.rows);
        if(err) throw err;
    });
};

const addProduct = async (request, response) => {
        const {product_name, brand_name, price, product_color, storage, product_description} = request.body;
        const client = new Client(options)
        client.connect()
            client.query('INSERT INTO radioshack (product_name, brand_name, price, product_color, storage, product_description) VALUES ($1, $2, $3, $4, $5, $6)',
             [product_name, brand_name, price, product_color, storage, product_description], (error, results) => {
                response.status(201).send(`${product_name} has been added successfully.`);
                if(error) throw error;
            });
};

  
const updateProduct = (request, response) => {
    const id = parseInt(request.params.id);
    const { product_name, brand_name, price, product_color, storage, product_description } = request.body;
    const client = new Client(options)
    client.connect()
    client.query('UPDATE radioshack SET product_name = $1, brand_name = $2, price = $3, product_color = $4, storage = $5, product_description = $6 WHERE id = $7', 
    [product_name, brand_name, price, product_color, storage, product_description, id], (error, results) => {
        response.status(200).send(`The product with id ${id} has been modified.`);
        if(error) throw error;
    });
  };
  
const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id);
    const client = new Client(options)
    client.connect()
    client.query('DELETE FROM radioshack WHERE id = $1', [id], (error, results) => {
        response.status(200).send(`The User with id ${id} has been deleted.`);
        if(error) throw error;
    });
  };


module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    addProduct,
    updateProduct,
    deleteProduct
}
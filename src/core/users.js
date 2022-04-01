require('dotenv').config()
const cli = require('nodemon/lib/cli')
const { Client } = require('pg')



const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'encode',
}

const allTheUsers = [
    {
      username: 'Mary1',
      password: "test"
    },
    {
      username: 'Joseph2',
      password: "test"
    },
    {
      username: 'Kyle3',
      password: "test"
    }
  ];

function getAllUsers( cb ) {
    const client = new Client(options)
    client.connect()
    client.query("SELECT * FROM login", (err, res) => {
        if (err) throw err;
        console.log(res)
        cb(res.rows)
    })
}

const getUsers = (request, response) => {
    const client = new Client(options)
    client.connect()
    client.query('SELECT * FROM login', (err, res) => {
          response.status(200).json(res.rows);
          if(err) throw err;
        });
};


const getUserById = (request, response) => {
    const client = new Client(options)
    client.connect()
    const id = parseInt(request.params.id);
        client.query('SELECT * FROM login WHERE id = $1', [id], (error, results) => {
            response.status(200).json(results.rows);
            if(err) throw err;
        });

};

const addUser = async (request, response) => {
        const { user_name, pass_word } = request.body;
        const client = new Client(options)
        client.connect()
            client.query('INSERT INTO login (user_name, pass_word) VALUES ($1, $2)', [user_name, pass_word], (error, results) => {
                response.status(201).send(`The User has been added successfully.`);
                if(error) throw error;

            });
};

  
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { user_name, pass_word } = request.body;
    const client = new Client(options)
    client.connect()
    client.query('UPDATE login SET user_name = $1, pass_word = $2 WHERE id = $3', [user_name, pass_word, id], (error, results) => {
        response.status(200).send(`The User with id ${id} has been modified.`);
        if(error) throw error;
    });
  };
  
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    const client = new Client(options)
    client.connect()
    client.query('DELETE FROM login WHERE id = $1', [id], (error, results) => {
        response.status(200).send(`The User with id ${id} hs been deleted.`);
    });
  };

module.exports = {
    getAllUsers,
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
}
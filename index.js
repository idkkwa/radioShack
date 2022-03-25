const express = require('express');
require('dotenv').config()


const app = express();

app.get('/api/v1/helloworld/', (request, response) =>{
    let out = request.params
    response.status(200).send({message: out})
})

app.get('/api/v1/helloworld/?pageNo=1&pageQnt=100', (req, res)=>{
    let out = req.query
    res.status(200).send({message: out.word})
})

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
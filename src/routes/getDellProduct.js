const { getDellProduct } = require('../core/products')

module.exports = async (req , res) => {

    getDellProduct( data => {
        res.status(200).send({message: data})
    })
}
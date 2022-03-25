const { getAllProducts } = require('../core/products')

module.exports = async (req , res) => {

    getAllProducts( data => {
        res.status(200).send({message: data})
    })
}
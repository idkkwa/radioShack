const { getRSProducts } = require('../core/products')

module.exports = async (req , res) => {

    getRSProducts( data => {
        res.status(200).send({message: data})
    })
}
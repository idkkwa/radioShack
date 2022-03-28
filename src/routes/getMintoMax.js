const { getMintoMax } = require('../core/priceMintoMax')

module.exports = async (req , res) => {

    getMintoMax( data => {
        res.status(200).send({message: data})
    })
}
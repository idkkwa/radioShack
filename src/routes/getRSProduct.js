const { getRSProducts } = require('../core/rsProduct')

module.exports = async (req , res) => {

    getRSProducts( data => {
        res.status(200).send({message: data})
    })
}
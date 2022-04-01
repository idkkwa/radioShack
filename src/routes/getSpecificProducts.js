const { getAppleProducts } = require("../core/products")


module.exports = async (req, res) => {
    getAppleProducts( data => {
        res.status(200).send({message: data})
    })
}
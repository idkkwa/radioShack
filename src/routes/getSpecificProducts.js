const { getSpecificProducts } = require("../core/specificProduct")


module.exports = async (req, res) => {
    getSpecificProducts( data => {
        res.status(200).send({message: data})
    })
}
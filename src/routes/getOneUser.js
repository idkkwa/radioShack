const { getUserById } = require('../core/users')

module.exports = async (req , res) => {

    getUserById( data => {
        res.status(200).send({message: data})
    })
}
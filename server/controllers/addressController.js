const {Address} = require('../models/models')
const ApiError = require('../error/ApiError');

class AddressController {
    async create(req, res) {
        const {region, city, street, house, appartament} = req.body
        const address = await Address.create({region, city, street, house, appartament})
        return res.json(address)
    }

    async getAll(req, res) {
        const address = await Address.findAll()
        return res.json(address)
    }

}

module.exports = new AddressController()

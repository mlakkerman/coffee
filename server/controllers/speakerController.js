const {Speakers} = require('../models/models')
const ApiError = require('../error/ApiError');

class SpeakerRouter {
    async create(req, res) {
        const {surname, name, patronymic, bio} = req.body
        const speaker = await Speakers.create({surname, name, patronymic, bio})
        return res.json(speaker)
    }

    async getAll(req, res) {
        const speakers = await Speakers.findAll()
        return res.json(speakers)
    }
}

module.exports = new SpeakerRouter()

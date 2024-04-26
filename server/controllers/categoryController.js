const {Categories} = require('../models/models')
const ApiError = require('../error/ApiError');

class CategoriesController {
    async create(req, res) {
        const {name} = req.body
        const category = await Categories.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const category = await Categories.findAll()
        return res.json(category)
    }

}

module.exports = new CategoriesController()

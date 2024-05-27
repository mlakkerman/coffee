const uuid = require('uuid')
const path = require('path');
const { Products, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            let { title, description, info, categoryId} = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Products.create({ title, description, categoryId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { categoryId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let whereClause = {};
        if (categoryId) whereClause.categoryId = categoryId;
    
        let products = await Products.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset
        })
        return res.json(products)
    }
    

    async getOne(req, res) {
        const { id } = req.params
        const product = await Products.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },
        )
        return res.json(product)
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const product = await Products.findOne({ where: { id } })
            if(!product){
                return next(ApiError.badRequest('Event Not Found'))
            }
    
            await product.destroy()
            return res.json({ message: "Event deleted successfully" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController()
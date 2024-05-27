const {Basket, Products, User} = require('../models/models');

class BasketController {
    async getBasket(req, res) {
        const userId = req.params.id;
        const basket = await Basket.findOne({
            where: { userId },
            include: Products
        });
        return res.json(basket);
    }

    async addItemToBasket(req, res) {
        const {userId, productId} = req.body;
        const basket = await Basket.findOne({where: {userId}});
        await basket.addProduct(productId);
        return res.json({message: "Товар успешно добавлен в корзину"});
    }

    async deleteItemFromBasket(req, res) {
        const {userId, productId} = req.body;
        const basket = await Basket.findOne({where: {userId}});
        await basket.removeProduct(productId);
        return res.json({message: "Товар успешно удален из корзины"});
    }
}

module.exports = new BasketController();

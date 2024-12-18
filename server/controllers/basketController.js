const { ProductBasket, Products, User, Basket } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
    async addProductInBasket(req, res, next) {
        const { userId, productId } = req.body;

        try {
            // Проверяем, есть ли уже товар в корзине
            const existingProduct = await ProductBasket.findOne({
                where: { userId, productId }
            });

            if (existingProduct) {
                // Если товар уже есть, увеличиваем количество
                existingProduct.quantity += 1;
                await existingProduct.save();
                return res.json(existingProduct);
            }

            // Добавляем товар в корзину
            const productAdd = await ProductBasket.create({
                userId,
                productId
            });

            return res.json(productAdd);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Получить корзину для пользователя
    async getBasketForUser(req, res, next) {
        const { userId } = req.params;

        try {
            // Ищем все товары в корзине пользователя
            const basket = await Products.findAll({
                include: [
                    {
                        model: User,
                        as: 'users',
                        where: { id: userId },
                        through: { attributes: [] }, // Игнорируем атрибуты промежуточной таблицы
                    }
                ]
            });

            if (basket.length === 0) {
                return res.status(404).json({ message: "Корзина пуста" });
            }

            return res.json(basket); // Отправляем товары в корзине
        } catch (e) {
            next(ApiError.internal(e.message)); // Обработка ошибок
        }
    }
    // Контроллер для проверки корзины
    async checkBasket(req, res, next) {
        const { userId, productId } = req.params;

        try {
            // Ищем товар в корзине пользователя
            const productInBasket = await ProductBasket.findOne({
                where: { userId, productId },
            });

            // Если товар найден в корзине
            if (productInBasket) {
                return res.json({ isInBasket: true });
            } else {
                return res.json({ isInBasket: false });
            }
        } catch (e) {
            next(ApiError.internal(e.message)); // Обрабатываем ошибку
        }
    }

}

module.exports = new BasketController();

const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.get('/:userId', basketController.getBasketForUser);
router.post('/', basketController.addProductInBasket);
router.get('/:userId/check/:productId', basketController.checkBasket);

module.exports = router;
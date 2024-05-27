const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.get('/basket/:id', basketController.getBasket);
router.post('/basket/', basketController.addItemToBasket);
router.delete('/basket/', basketController.deleteItemFromBasket);

module.exports = router;
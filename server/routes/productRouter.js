const Router = require('express')
const router = new Router()
const productRouter = require('../controllers/productController')

router.post('/', productRouter.create)
router.get('/', productRouter.getAll)
router.get('/:id', productRouter.getOne)
router.delete('/:id', productRouter.delete)

module.exports = router

const Router = require('express')
const router = new Router()
const categoryRouter = require('../controllers/categoryController')

router.post('/', categoryRouter.create)
router.get('/', categoryRouter.getAll)

module.exports = router

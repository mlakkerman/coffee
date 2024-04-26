const Router = require('express')
const router = new Router()
const eventRouter = require('../controllers/eventController')

router.post('/', eventRouter.create)
router.get('/', eventRouter.getAll)
router.get('/:id', eventRouter.getOne)

module.exports = router

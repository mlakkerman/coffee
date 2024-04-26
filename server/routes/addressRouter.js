const Router = require('express')
const router = new Router()
const addressRouter = require('../controllers/addressController')

router.post('/', addressRouter.create)
router.get('/', addressRouter.getAll)

module.exports = router
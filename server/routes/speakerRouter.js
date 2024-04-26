const Router = require('express')
const router = new Router()
const speakerController = require('../controllers/speakerController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', speakerController.create) // checkRole('ADMIN'),
router.get('/', speakerController.getAll)

module.exports = router

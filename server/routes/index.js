const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')

router.use('/basket', basketRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)

module.exports = router

const express=require('express')
const router=express.Router()
const { authUser, isAdmin } = require('../authMiddleware/authentication')
const{checkout,paymentvarification,getkey,userOrder,cancelOrders}=require('../controller/orderController')

router.post('/checkout',authUser,checkout)
router.post('/payment_varification',authUser,paymentvarification)
router.get('/getkey',authUser,getkey)
router.get('/order-page/:orderStatus',authUser,userOrder)
router.get('/cancel-order/:oid',authUser,cancelOrders)

module.exports = router
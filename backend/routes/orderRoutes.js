import express from 'express'
const router = express.Router()
import {order, orderById, orderPaid, orderDelivered, orderUser, ordersAdmin,} from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').post(protect, order).get(protect,admin, ordersAdmin)
router.route('/myorders').get(protect, orderUser)
router.route('/:id').get(protect, orderById)
router.route('/:id/pay').put(protect, orderPaid)
router.route('/:id/deliver').put(protect,admin, orderDelivered)


export default router

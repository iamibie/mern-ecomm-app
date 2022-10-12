import express from 'express'
const router = express.Router()
import {getProducts, getProductById, updateProduct} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'



router.route('/').get(getProducts)

router.route('/:id').get(getProductById).put(protect, admin, updateProduct)

router.route('/:id/admin-edit-product').put(protect, admin, updateProduct)

router.route('/admin/products').get(protect, admin, getProducts)



export default router
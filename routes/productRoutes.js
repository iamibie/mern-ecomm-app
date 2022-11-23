import express from 'express'
const router = express.Router()
import {products, productById, updateProduct, createProduct, deleteProduct} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'



router.route('/').get(products).post(protect, admin, createProduct)

router.route('/:id').get(productById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

router.route('/:id/admin-edit-product').put(protect, admin, updateProduct)

router.route('/admin/products').get(protect, admin, products)



export default router 
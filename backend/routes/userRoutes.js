import express from 'express'
const router = express.Router()
import {userLogin, userRegister, userProfile, userUpdate, users, deleteUser, userById, updateUser} from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').post(userRegister).get(protect, admin, users)
router.post('/login', userLogin)
router.route('/profile').get(protect, admin, userProfile).put(protect, userUpdate)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, userById).put(protect, admin, updateUser)


export default router
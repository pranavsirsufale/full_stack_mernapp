import express from 'express'
import { getAllUsers , getAllContacts , delteUser , getTheUser ,updateUser , deleteContact } from '../controllers/admin.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()
router.route('/user/:id').get(authMiddleware,getTheUser)
router.route('/users').get(authMiddleware, getAllUsers)
router.route('/contacts').get(authMiddleware, getAllContacts)
router.route('/users/delete/:id').delete( authMiddleware,delteUser)
router.route('/contacts/delete/:id').delete(authMiddleware, deleteContact)
router.route('/user/update/:id').patch(authMiddleware,updateUser)



export default router
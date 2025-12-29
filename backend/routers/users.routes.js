const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/users.controller")
const {isAdmin} = require('../middlewares/adminMiddleware.js')
const { authMiddleware } = require('../middlewares/authMiddleware')


userRouter.post('/signUp', userController.userSignUp);
userRouter.get('/coaches', userController.getCoaches); // Ruta pública para listar coaches
userRouter.post('/logIn', userController.userLogIn);
userRouter.post('/logOut', userController.logOut)
userRouter.patch('/changeRole/:id', authMiddleware,isAdmin, userController.changeUserRole)
userRouter.get('/getUsers',authMiddleware ,isAdmin ,userController.getUsers)
userRouter.patch('/updateProfile/:id',authMiddleware ,userController.updateUserProfile)
module.exports = userRouter

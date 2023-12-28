import { Router, response } from "express";
import { UsersController } from "../controllers/usersController.js";
import { ensureAuthenticated } from '../middlewares/ensureAuth.js'
import { UserAvatarController } from "../controllers/userAvatarController.js";
import multer from "multer";
import uploadConfig from "../configs/upload.js"

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRoutes.post('/', usersController.create)
userRoutes.put('/', ensureAuthenticated, usersController.update)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

export default userRoutes
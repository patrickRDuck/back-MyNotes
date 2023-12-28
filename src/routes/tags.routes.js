import { Router } from "express";
import TagsController from "../controllers/tagsController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuth.js";

const tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.get('/', ensureAuthenticated, tagsController.index)

export default tagsRoutes
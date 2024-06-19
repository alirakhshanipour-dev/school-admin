import { Router } from "express";
import { UserController } from "../controllers/user/user.controller.js";

const router = Router()
router.get("/list", UserController.getUsers)
router.get("/:id", UserController.getUser)

export { router as UserRouter }
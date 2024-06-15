import { Router } from "express";
import { StudentController } from "../controllers/students/student.controller.js";

const router = Router()
router.post("/create", StudentController.create)

export { router as StudentRouter }
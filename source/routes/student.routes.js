import { Router } from "express";
import { StudentController } from "../controllers/students/student.controller.js";

const router = Router()
router.get("/:id", StudentController.getStudent)
router.get("/list", StudentController.getStudents)
router.post("/create", StudentController.create)

export { router as StudentRouter }
import { Router } from "express";
import { StudentController } from "../controllers/students/student.controller.js";

const router = Router()
router.get("/list", StudentController.getStudents)
router.get("/:id", StudentController.getStudent)
router.post("/create", StudentController.create)
router.patch("/update/:id", StudentController.updateStudent)
router.delete("/delete/:id", StudentController.deleteStudent)
router.delete("/delete", StudentController.deleteAllStudents)

export { router as StudentRouter }

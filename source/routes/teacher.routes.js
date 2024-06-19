import { Router } from "express";
import { TeacherController } from "../controllers/teachers/teacher.controller.js";

const router = Router()
router.post("/create", TeacherController.create)
router.get("/list", TeacherController.getTeachers)
router.get("/:id", TeacherController.getTeacher)

export { router as TeacherRouter }
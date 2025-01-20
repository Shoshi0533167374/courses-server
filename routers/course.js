import { Router } from "express";
import { getAllCourses, getCourseById, deleteCourseById, updateCourseById, addCourse } from "../controllers/course.js"

const router=Router();

router.get("",getAllCourses);
router.get("/:id",getCourseById);
router.delete("/:id",deleteCourseById);
router.put("/:id",updateCourseById);
router.post("",addCourse);

export default router;
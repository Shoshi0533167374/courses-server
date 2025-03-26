import { Router } from "express";
import { getAllCourses, getCourseById, deleteCourseById, updateCourseById, addCourse ,getTotalCoursesPages} from "../controllers/course.js"
import { isUserAdmin } from "../middleware/checkToken.js";
 
const router=Router();

router.get("",getAllCourses);
router.get("/total",getTotalCoursesPages);
router.get("/:id",getCourseById);
router.delete("/:id",isUserAdmin,deleteCourseById);
router.put("/:id",isUserAdmin,updateCourseById);
router.post("",isUserAdmin,addCourse);

export default router;

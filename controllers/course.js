import mongoose from "mongoose";

import { courseModel } from "../models/course.js";


// פונקציה המחזירה את כל הקורסים
export const getAllCourses = async (req, res) => {
    let limit = req.query.limit || 4;
    let page = req.query.page || 1;

    try {
        let data = await courseModel.find().skip((page - 1) * limit).limit(limit);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, it is not possible to get the list of all courses", message: err.message });
    }
}

//limit פונקציה שמחזירה מספר עמודים לפי   
export const getTotalCoursesPages = async (req, res) => {
    let limit = req.query.limit || 4;
    try {
        let result = await courseModel.countDocuments();

        res.json({
            totalCount: result,
            totalPages: Math.ceil(result / limit),
            limit: limit
        });
    }
    catch (err) {
        res.status(400).json({ title: "Error, it is not possible to get the total count of pages", message: err.message })
    }
}

//ID פונקציה המחזירה קורס לפי   
export const getCourseById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "Error", message: "The id is not valid" });
    try {
        let data = await courseModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "Error", message: "The ID does not exist" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the course cannot be displayed by ID", message: err.message });
    }
}

//ID פונקציה המוחקת קורס לפי 
export const deleteCourseById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "Error", message: "The id is not valid" });
    try {
        let data = await courseModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "Error", message: "The ID does not exist" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the course cannot be deleted", message: err.message });
    }
}

//ID פונקציה המעדכנת קורס לפי 
export const updateCourseById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "Error", message: "The id is not valid" });
    try {
        let data = await courseModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "Error", message: "The ID does not exist" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the course cannot be updated", message: err.message });
    }
}

//פונקציה המוסיפה קורס
export const addCourse = async (req, res) => {
    let { body } = req;
    if (!body.name || !body.description || !body.startDate || !body.imagePath || !body.price
        || !body.studyDays || !body.lecturer.fullName || !body.lecturer.email)
        return res.status(400).json({ title: "Error, a course cannot be added", message: "details are missing" });
    if (new Date(body.startDate) <= new Date()) {
        return res.status(400).json({ title: "Error", message: "Start date must be in the future" });
    }
    if (body.price <= 0) {
        return res.status(400).json({ title: "Error", message: "Price must be greater than 0" });
    }
    // ביטוי רגולרי לבדיקה אם האימייל בפורמט תקין
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.lecturer.email)) {
        return res.status(400).json({ title: "Error", message: "Invalid email format" });
    }

    // ביטוי רגולרי לבדיקה אם מספר הטלפון בפורמט תקין (ישראלי לדוגמה)
    if (body.lecturer?.phone) {
        const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{9,10}$/;
        if (!phoneRegex.test(body.lecturer.phone)) {
            return res.status(400).json({ title: "Error", message: "Invalid phone number format" });
        }
    }
    try {
        let newCourse = new courseModel(body);
        let data = await newCourse.save();
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the course cannot be added", message: err.message });
    }

}





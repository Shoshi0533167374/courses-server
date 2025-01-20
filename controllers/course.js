import mongoose from "mongoose";

import { courseModel } from "../models/course.js";


export const getAllCourses = async (req, res) => {
    try {
        let data = await courseModel.find();
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, it is not possible to get the list of all courses", message: err.message });
    }
}

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

export const addCourse = async (req, res) => {
    let { body } = req;
    if (!body.name || !body.description || !body.startDate || !body.imagePath || !body.price
        || !body.studyDays || !body.category || !body.lecturer.fullName || !body.lecturer.email)
        return res.status(400).json({ title: "Error, a course cannot be added", message: "details are missing" });
    try {
        let newCourse = new courseModel(body);
        let data = await newCourse.save();
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the course cannot be added", message: err.message });
    }

}





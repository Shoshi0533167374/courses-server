import mongoose from "mongoose";

import { userModel } from "../models/user.js"
import { generateToken } from "../utils/generateToken.js";


// פונקציה של רישום משתמש חדש למערכת 
export const signUp = async (req, res) => {
    let { body } = req;
    if (!body.userName || !body.password || !body.email)
        return res.status(400).json({ title: "Error, you cant sign up", message: "details are missing" });
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!passwordRegex.test(body.password))
        return res.status(400).json({ title: "Error", message: "The password format is incorrect" });
    if (!emailRegex.test(body.email))
        return res.status(400).json({ title: "Error", message: "The email format is incorrect" });
    try {
        let data = await userModel.findOne({ userName: body.userName, password: body.password });
        if (data)
            return res.status(409).json({ title: "Error, you cant sign up", message: "choose a different userName or Password" });
        let newUser = new userModel(body);
        data = await newUser.save();
        let userWithoutPassword = data.toObject();
        delete userWithoutPassword.password;
        let token = generateToken(userWithoutPassword);
        res.json({ ...userWithoutPassword, token });
    }
    catch (err) {
        return res.status(400).json({ title: "Error, you cant sign up", message: err.message });
    }
}

// פונקציה המחזירה את כל המשתמשים  
export const getAllUsers = async (req, res) => {
    let limit = req.query.imit || 10;
    let page = req.query.page || 1;

    try {
        let data = await userModel.find().skip((page - 1) * limit).limit(limit).select('-password');
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, it is not possible to get the list of all users", message: err.message });
    }
}

//ID פונקציה המחזירה משתמש לפי 
export const getUserById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "Error", message: "The id is not valid" });
    try {
        let data = await userModel.findById(id).select('-password');
        if (!data)
            return res.status(404).json({ title: "Error", message: "The ID does not exist" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the user cannot be displayed by ID", message: err.message });
    }
}

// פונקציה המעדכנת פרטי משתמש חוץ מסיסמה   
export const UpdateExceptPassword = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "Error", message: "The id is not valid" });
    try {
        if (req.body.password)
            return res.status(400).json({ title: "Error", message: "Password cannot be updated in this option" });
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "Error", message: "The ID does not exist" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the user cannot be updated", message: err.message });
    }
}

// פונקציה המעדכנת סיסמת משתמש     
export const UpdatePassword = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "Error", message: "The id is not valid" });
    try {
        if (!req.body.password)
            return res.status(400).json({ title: "Error", message: "Password is missing" });
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "Error", message: "The ID does not exist" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "Error, the user password cannot be updated.", message: err.message });
    }
}

//פונקציה של התחברות משתמש למערכת לפי שם משתמש וסיסמה
export const logIn = async (req, res) => {
    let { userName, password } = req.body;
    if (!userName || !password)
        return res.status(400).json({ title: "Error, missing details.", message: "Password / userName is missing" });
    try {
        let data = await userModel.findOne({ userName: userName, password: password }).select('-password');
        if (!data)
            return res.status(404).json({ title: "Error, you cant login", message: "There is no user with such details" });
        let token = generateToken(data);
        res.json({ ...data.toObject(), token });
    }
    catch (err) {
        res.status(400).json({ title: "Error, you cant login.", message: err.message });
    }
}
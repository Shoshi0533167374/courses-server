import { Schema, model } from "mongoose";

const userSchema = Schema({
    userName: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true, default: "USER" },
    registrationDate: { type: Date, default: new Date() },
    email:  { type: String, require: true }
})

export const userModel = model("user", userSchema);
import { Schema, model} from "mongoose";

 
//סכמת מרצה בקורס
const lecturerSchema = Schema({
    fullName: { type: String, require: true },
    phone: String,
    email: { type: String, require: true }
});

//סכמת קורס
const courseSchema = Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    startDate: { type: Date, require: true },
    imagePath: { type: String, require: true },
    price: { type: Number, require: true },
    studyDays: { type: [String], require: true },
    category: { type: String, require: true },
    lecturer: { type: lecturerSchema, require: true }
});

export const courseModel = model("course", courseSchema);
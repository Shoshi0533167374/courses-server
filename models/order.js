import { Schema, model, Types } from "mongoose";

 
//סכמת קורס מינימלי
const minimalCourseSchema = Schema({
    _id: { type: Types.ObjectId, ref: "course" },
    name: { type: String, require: true },
    price: { type: Number, require: true },
})

//סכמת הזמנה
const orderSchema = Schema({
    userId: { type: Types.ObjectId, ref: "user", require: true },
    courses: { type: [minimalCourseSchema], require: true },
    orderDate: { type: Date, default: new Date() },
    finalPrice: {
        type: Number,
        default: function () {
            let sum = 0;
            for (let course of this.courses) {
                sum += course.price;
            }
            return sum;
        }
    },
    isPaid: { type: Boolean, default: false }
})

export const orderModel = model("order", orderSchema);
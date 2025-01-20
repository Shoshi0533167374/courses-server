import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {connectToDB} from "./config/DB.js"
import courseRouter from "./routers/course.js"
import userRouter from "./routers/user.js"
import orderRouter from "./routers/order.js"


dotenv.config();
connectToDB();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/courses",courseRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

let port=process.env.PORT;
app.listen(port,()=>{
    console.log("app is running on port "+port);
});
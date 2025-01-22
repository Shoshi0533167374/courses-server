import mongoose from "mongoose";

//DB פונקציה  המתחברת ל 
export const connectToDB= async () => {
    try{
        let connection=await mongoose.connect(process.env.DB_URI);
        console.log("mongo db connected");
    }
    catch(err){
        console.log("cannot connect to db"+err.message);
        process.exit(1);
    }
}
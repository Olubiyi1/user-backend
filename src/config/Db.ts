import mongoose from "mongoose";
import config from "./config";

export const connectDb = async()=>{
    try{
       await mongoose.connect(config.mongo_url)
       console.log("Database connection successful")
    }
    catch(error){
        console.error("Failed to connect database")
    }
}
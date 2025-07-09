import config from "./config/config";
import app from "./app";
import { connectDb } from "./config/Db";

app.listen(config.port,()=>{
    console.log("app up and running")
})

connectDb()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import userRouter from "./routes/user.routes"
import adminRouter from "./routes/adminRoutes/admin.routes"

const app = express()
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/user",userRouter)
app.use("/api/admin", adminRouter)


export default app;
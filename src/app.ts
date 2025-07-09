import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"

const app = express()
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

export default app;
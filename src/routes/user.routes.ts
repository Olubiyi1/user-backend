import express from "express"
import { registerUserValidationSchema,loginValidationSchema } from "../validationSchema/user.validationSchemaJoi";
import { loginUser, registerUser } from "../controllers/user.controller";
import { validateRequest } from "../middlewares/userValidationMiddleware";

const router = express.Router()

router.get("/",(req,res)=>{
res.send("up and running")
})

router.post("/signup",validateRequest(registerUserValidationSchema),registerUser)
router.post("/login",validateRequest(loginValidationSchema),loginUser)

export default router
import express from "express"
import { registerUserValidationSchema,loginValidationSchema, resetPasswordSchema } from "../validationSchema/user.validationSchemaJoi";
import { loginUserController, registerUserController,resendVerificationController, resetUserPasswordController } from "../controllers/user.controller";
import { validateRequest } from "../middlewares/userValidationMiddleware";
import { verifyEmail } from "../controllers/emailVerifcation.controller";

const router = express.Router()

router.get("/",(req,res)=>{
res.send("up and running")
})

router.post("/signup",validateRequest(registerUserValidationSchema),registerUserController)
router.post("/resend-verification",resendVerificationController)
router.get("/verify-email",verifyEmail)
router.post("/login",validateRequest(loginValidationSchema),loginUserController)
router.post("/reset-password/:token",validateRequest(resetPasswordSchema), resetUserPasswordController);


export default router
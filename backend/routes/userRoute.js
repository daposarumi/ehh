import express from "express"
import { loginUser,registerUser, forgotPassword, verifyOtpAndResetPassword } from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/reset-password", verifyOtpAndResetPassword)





userRouter.post("/forgot-password", forgotPassword)


export default userRouter;
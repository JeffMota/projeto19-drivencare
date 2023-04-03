import { Router } from "express";
import validateSchemas from "../middlewares/validateSchemas.js";
import { signinSchema, signupSchema } from "../schemas/users.schemas.js";
import userControllers from "../controllers/user.controller.js";
import validateToken from "../middlewares/validateToken.js";

const userRouter = Router()

userRouter.post("/signup", validateSchemas(signupSchema), userControllers.signup)
userRouter.post("/signin", validateSchemas(signinSchema), userControllers.signin)

userRouter.get("/doctors/", validateToken, userControllers.findDoctor)

export default userRouter
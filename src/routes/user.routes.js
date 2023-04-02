import { Router } from "express";
import validateSchemas from "../middlewares/validateSchemas.js";
import { signupSchema } from "../schemas/users.schemas.js";
import userControllers from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post("/signup", validateSchemas(signupSchema), userControllers.signup)
userRouter.post("/signin", userControllers.signin)

export default userRouter
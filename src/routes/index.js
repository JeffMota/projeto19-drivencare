import { Router } from "express";
import scheduleRouter from "./schedules.routes.js";
import userRouter from "./user.routes.js";

const routes = Router()
routes.use("/users", userRouter)
routes.use("/schedules", scheduleRouter)

export default routes
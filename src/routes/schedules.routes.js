import { Router } from "express"
import scheduleController from "../controllers/schedule.controller.js"
import validateToken from "../middlewares/validateToken.js"

const scheduleRouter = Router()

scheduleRouter.get("/:id", validateToken, scheduleController.getDocSchedule)

export default scheduleRouter
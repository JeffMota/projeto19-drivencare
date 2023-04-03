import { Router } from "express"
import scheduleController from "../controllers/schedule.controller.js"
import validateToken from "../middlewares/validateToken.js"

const scheduleRouter = Router()

scheduleRouter.get("/:id", validateToken, scheduleController.getDocSchedule)
// scheduleRouter.post("/request", validateToken, scheduleController.sendSchedulingRequest)

export default scheduleRouter
import { Router } from "express"
import scheduleController from "../controllers/schedule.controller.js"
import validateSchemas from "../middlewares/validateSchemas.js"
import validateToken from "../middlewares/validateToken.js"
import { schedulingSchema } from "../schemas/schedules.schemas.js"

const scheduleRouter = Router()

scheduleRouter.get("/:id", validateToken, scheduleController.getDocSchedule)
scheduleRouter.post("/request", validateToken, validateSchemas(schedulingSchema), scheduleController.sendSchedulingRequest)

export default scheduleRouter
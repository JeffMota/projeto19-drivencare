import joi from "joi"

export const schedulingSchema = joi.object({
    scheduleId: joi.number().required(),
    doctorId: joi.number().required(),
    time: joi.string().length(5).required()
})
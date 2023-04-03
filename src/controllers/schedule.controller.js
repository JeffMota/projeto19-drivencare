import scheduleService from "../services/schedule.service.js"

async function getDocSchedule(req, res, next) {
    const { id } = req.params
    try {
        const schedule = await scheduleService.getDocSchedule(id)

        res.send(schedule)
    } catch (error) {
        next(error)
    }

}

async function sendSchedulingRequest(req, res, next) {
    const { scheduleId, doctorId, time } = req.body
    const patientId = res.locals.user.id

    try {
        await scheduleService.sendSchedulingRequest(scheduleId, patientId, doctorId, time)

        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

async function getSchedules(req, res, next) {
    const userId = res.locals.user.id

    try {
        const schedules = await scheduleService.getSchedules(userId)

        res.send(schedules)

    } catch (error) {
        next(error)
    }
}

export default {
    getDocSchedule,
    sendSchedulingRequest,
    getSchedules
}
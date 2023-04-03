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

export default {
    getDocSchedule
}
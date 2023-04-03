import errors from "../errors/index.js";
import userRepositories from "../repositories/user.repositories.js";
import scheduleRepositories from "../repositories/schedules.repositories.js"

async function getDocSchedule(id) {

    const { rowCount, rows: [user] } = await userRepositories.findUserBy('id', id)
    if (!rowCount) throw errors.notFound("Doctor not found")

    const { rows } = await scheduleRepositories.getDocSchedule(id)
    const { rows: times } = await scheduleRepositories.getUnavailableTime(id)


    const schedule = rows.map(sch => {
        const start = Number(sch.startHour.split(':')[0])
        const end = Number(sch.endHour.split(':')[0])

        const list = []

        for (let i = start; i < end; i++) {
            let time
            let available = true
            if (i < 10) {
                time = '0' + i + ':00'
            }
            else {
                time = i + ':00'
            }

            times.forEach(times => {
                if (times.scheduleId == sch.id && times.time == time) available = false
            })

            if (available) list.push(time)

        }

        return { id: sch.id, name: user.name, date: sch.date, schedule: list }
    })

    return schedule
}

async function sendSchedulingRequest(scheduleId, patientId, doctorId, time) {

    const { rowCount } = await userRepositories.findUserBy('id', doctorId)
    if (!rowCount) throw errors.notFound("Doctor not found")

    await scheduleRepositories.sendSchedulingRequest(scheduleId, patientId, doctorId, time)

}

async function getSchedules(userId) {
    let schedules

    const { rowCount, rows: [user] } = await userRepositories.findUserBy('id', userId)
    if (!rowCount) throw errors.notFound("User not found")

    if (user.role === "pat") {
        const { rows } = await scheduleRepositories.getScheduling('patientId', userId)
        schedules = rows
    }
    if (user.role === "doc") {
        const { rows } = await scheduleRepositories.getScheduling('doctorId', userId)
        schedules = rows
    }

    return schedules
}

export default {
    getDocSchedule,
    sendSchedulingRequest,
    getSchedules
}
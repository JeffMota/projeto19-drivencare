import errors from "../errors/index.js";
import userRepositories from "../repositories/user.repositories.js";
import scheduleRepositories from "../repositories/schedules.repositories.js"

async function getDocSchedule(id) {

    const { rowCount, rows: [user] } = await userRepositories.findUserBy('id', id)
    if (!rowCount) throw errors.notFound("Doctor not found")

    const { rows } = await scheduleRepositories.getDocSchedule(id)

    const schedule = rows.map(sch => {
        const start = Number(sch.startHour.split(':')[0])
        const end = Number(sch.endHour.split(':')[0])

        const list = []
        for (let i = start; i < end; i++) {
            if (i < 10) list.push('0' + i + ':00')
            else list.push(i + ':00')
        }

        return { name: user.name, date: sch.date, schedule: list }
    })

    return schedule
}

export default {
    getDocSchedule
}
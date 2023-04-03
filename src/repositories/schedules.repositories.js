import connectionDb from "../config/database.js"

async function getDocSchedule(id) {
    return await connectionDb.query(`
        SELECT id, date, "startHour", "endHour" FROM schedules WHERE "doctorId" = $1;
    `,
        [id]
    )
}

async function getUnavailableTime(doctorId) {
    return await connectionDb.query(`
        SELECT "scheduleId", time FROM scheduling WHERE status = 'confirmed' AND "doctorId" = $1;
    `,
        [doctorId]
    )
}

export default {
    getDocSchedule,
    getUnavailableTime
}
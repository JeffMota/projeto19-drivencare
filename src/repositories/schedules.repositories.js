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

async function sendSchedulingRequest(scheduleId, patientId, doctorId, time) {
    await connectionDb.query(`
        INSERT INTO scheduling ("scheduleId", "patientId", "doctorId", time) values ($1, $2, $3, $4);
    `,
        [scheduleId, patientId, doctorId, time]
    )
}

export default {
    getDocSchedule,
    getUnavailableTime,
    sendSchedulingRequest
}
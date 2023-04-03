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

async function getScheduling(role, userId) {
    return await connectionDb.query(`
    SELECT time, status, date, patient.name AS patient, 
        doctor.name AS doctor, 
        "doctorInfos".expertise 
    FROM scheduling 
        JOIN schedules 
            ON scheduling."scheduleId" = schedules.id 
        JOIN users AS patient 
            ON scheduling."patientId" = patient.id 
        JOIN users AS doctor 
            ON scheduling."doctorId" = doctor.id 
        JOIN "doctorInfos" 
            ON doctor.id = "doctorInfos"."userId" 
    WHERE scheduling."${role}" = $1;
    `,
        [userId]
    )
}

export default {
    getDocSchedule,
    getUnavailableTime,
    sendSchedulingRequest,
    getScheduling
}
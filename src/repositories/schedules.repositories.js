import connectionDb from "../config/database.js"

async function getDocSchedule(id) {
    return await connectionDb.query(`
        SELECT date, "startHour", "endHour" FROM schedules WHERE "doctorId" = $1;
    `,
        [id]
    )
}

export default {
    getDocSchedule
}
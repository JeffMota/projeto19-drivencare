import connectionDb from "../config/database.js"

async function findByEmail(email) {
    return await connectionDb.query(`
    SELECT * FROM users WHERE email = $1;
    `,
        [email]
    )
}

async function signup({ name, email, password, role }) {
    return await connectionDb.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id;
    `,
        [name, email, password, role]
    )
}

async function setDocInfos({ userId, expertise, local }) {
    await connectionDb.query(`
        INSERT INTO "doctorInfos" ("userId", expertise, local) VALUES ($1, $2, $3);
    `,
        [userId, expertise, local]
    )
}

export default {
    findByEmail,
    signup,
    setDocInfos
}
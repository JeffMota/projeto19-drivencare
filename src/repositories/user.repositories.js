import connectionDb from "../config/database.js"

async function findUserBy(keyField, keyWord) {
    return await connectionDb.query(`
        SELECT * FROM users WHERE ${keyField} = $1;
    `,
        [keyWord]
    )
}

async function findDoctor(keyField, keyWord) {
    return await connectionDb.query(`
    SELECT users.name, "doctorInfos".expertise, "doctorInfos".local 
    FROM users 
        JOIN "doctorInfos" 
            ON "doctorInfos"."userId" = users.id 
    WHERE ${keyField} LIKE $1;
    `,
        ["%" + keyWord + "%"]
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
    findUserBy,
    signup,
    setDocInfos,
    findDoctor
}
import errors from "../errors/index.js"
import userRepositories from "../repositories/user.repositories.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function signup({ name, email, password, role, expertise, local }) {

    const { rowCount } = await userRepositories.findUserBy('email', email)
    if (rowCount) throw errors.duplicatedEmailError(email)

    const hashedPassword = await bcrypt.hash(password, 10)

    if (role === 'doc') {
        if (!expertise || !local) throw errors.validateSchemaError("'expertise' and 'local' fields must not be empty if you are a doctor!")
    }

    const { rows } = await userRepositories.signup({ name, email, password: hashedPassword, role })
    const userId = rows[0].id

    if (role === 'doc') {
        if (!expertise || !local) throw errors.validateSchemaError("'expertise' and 'local' fields must not be empty if you are a doctor!")
        await userRepositories.setDocInfos({ userId, expertise, local })
    }

}

async function signin({ email, password }) {
    const { rowCount, rows: [user] } = await userRepositories.findUserBy('email', email)
    if (!rowCount) throw errors.invalidCredentialsError()

    const passwordIsCorrect = bcrypt.compareSync(password, user.password)
    if (!passwordIsCorrect) throw errors.invalidCredentialsError()

    const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY,
        { expiresIn: 86400 }
    );

    return token
}

async function findDoctor(name, local, expertise) {
    let doc

    if (name) {
        const { rowCount, rows } = await userRepositories.findDoctor("name", name)
        if (!rowCount) throw errors.notFound("Doctor not found")
        doc = rows
    }
    if (local) {
        const { rowCount, rows } = await userRepositories.findDoctor('local', local)
        if (!rowCount) throw errors.notFound("Local not found")
        doc = rows
    }
    if (expertise) {
        const { rowCount, rows } = await userRepositories.findDoctor('expertise', expertise)
        if (!rowCount) throw errors.notFound("Expertise not found")
        doc = rows
    }

    if (!doc) throw errors.notFound("Doctor not found")
    return doc
}

export default {
    signup,
    signin,
    findDoctor
}
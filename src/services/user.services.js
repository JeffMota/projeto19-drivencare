import errors from "../errors/index.js"
import userRepositories from "../repositories/user.repositories.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function signup({ name, email, password, role, expertise, local }) {

    const { rowCount } = await userRepositories.findByEmail(email)
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

    console.log(userId)

}

async function signin({ email, password }) {
    const { rowCount, rows: [user] } = await userRepositories.findByEmail(email)
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

export default {
    signup,
    signin
}
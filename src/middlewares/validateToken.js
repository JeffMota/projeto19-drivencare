import errors from "../errors/index.js"
import jwt from "jsonwebtoken"
import userRepositories from "../repositories/user.repositories.js"
import dotenv from "dotenv"
dotenv.config()

export default function validateToken(req, res, next) {
    const { authorization } = req.headers
    if (!authorization) throw errors.invalidCredentialsError("Invalid Token")

    const parts = authorization.split(' ')
    if (parts.length !== 2) throw errors.invalidCredentialsError("Invalid Token")

    const [schema, token] = parts
    if (schema !== "Bearer") throw errors.invalidCredentialsError("Invalid Token")

    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        try {
            if (error !== null) throw errors.invalidCredentialsError(error)

            const { rows: [user] } = await userRepositories.findUserBy('id', decoded.userId)
            if (!user) throw errors.invalidCredentialsError("User not found")

            res.locals.user = user
            next()

        } catch (error) {
            next(error)
        }


    })

}
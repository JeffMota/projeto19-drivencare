import userServices from "../services/user.services.js"

async function signup(req, res, next) {
    const { name, email, password, role, expertise, local } = req.body

    try {
        await userServices.signup({ name, email, password, role, expertise, local })
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

async function signin(req, res, next) {
    const { email, password } = req.body

    try {
        const token = await userServices.signin({ email, password })
        res.send({ token })
    } catch (error) {
        next(error)
    }
}

export default {
    signup,
    signin
}
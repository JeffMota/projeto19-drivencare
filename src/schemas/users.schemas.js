import joi from "joi"

export const signupSchema = joi.object({
    role: joi.string().length(3).valid('pat', 'doc').required(),
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    expertise: joi.string(),
    local: joi.string()
})

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
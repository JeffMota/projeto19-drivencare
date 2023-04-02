import joi from "joi"

export const signupSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().length(3).valid('pat', 'doc').required(),
    expertise: joi.string(),
    local: joi.string()
})

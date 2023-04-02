import err from "../errors/index.js"

export default function validateSchemas(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            const errors = error.details.map((detail) => detail.message)
            throw err.validateSchemaError(errors)
        }

        next()
    }
}
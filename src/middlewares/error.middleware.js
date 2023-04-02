import httpStatus from "http-status"

export function handleApplicationErrors(err, req, res, next) {
    if (err.name === "ValidationSchemaFailed") {
        return res
            .status(httpStatus.UNPROCESSABLE_ENTITY)
            .send({ message: err.message })
    }

    if (err.name === "DuplicatedEmailError") {
        return res
            .status(httpStatus.CONFLICT)
            .send({ message: err.message, email: err.email })
    }

    if (err.name === "InvalidCredentialsErro") {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ message: err.message })
    }
}
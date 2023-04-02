function validateSchemaError(message) {
    return {
        name: "ValidationSchemaFailed",
        message
    }
}

function duplicatedEmailError(email) {
    return {
        name: "DuplicatedEmailError",
        message: "There is already a user with given email",
        email,
    }
}

function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsErro",
        message: "Email or password incorrect"
    }
}

export default {
    validateSchemaError,
    duplicatedEmailError
}
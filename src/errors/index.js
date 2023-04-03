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

function invalidCredentialsError(message = "Email or password incorrect") {
    return {
        name: "InvalidCredentialsErro",
        message
    }
}

function notFound(message = '') {
    return {
        name: "NotFound",
        message
    }
}

export default {
    validateSchemaError,
    duplicatedEmailError,
    invalidCredentialsError,
    notFound
}
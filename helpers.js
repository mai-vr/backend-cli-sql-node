import { database } from "./configSql.js"

const existingFields = (data) => {
    const { username, email, password } = data

    if (username && email && password) {
        return true
    }
}

const emailFormat = (email) => {
    return email.endsWith('@gmail.com') // Devuelve el valor booleano que resulte de la expresión.
    // Solo se aceptan correos electrónicos de gmail.
}

const verifyDataLength = (value) => {
    return value.length >= 3 && !value.length <= 20
}

const charactersValidation = (value, type) => {
    const usernameCharacters = /^[a-zA-Z]+$/ // El nombre solo puede contener letras.
    const passwordCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/    
    // La contraseña debe contener solo letras mayúsculas, minúsculas y números.

    if (type === 'username') {
        return usernameCharacters.test(value)
    } else if (type === 'password') {
        return passwordCharacters.test(value)
    }
}

const verifyDataBaseConnection = async (request, params = []) => {
    try {
        const [result] = await database.query(request, params)
        return result
    } catch (error) {
        if (error.code === 'ECONNREFUSED' || error.errno === -4078) {
            return `
            °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
            °   Could not connect to the database   °
            °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
            `
        } else if (error.code === 'ER_DUP_ENTRY') {
            return `
            °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
            °   The email or the id is being used   °
            °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
            `
            // La base de datos tiene como condición que el email y el id sean únicos.
        }
        return error.message
    }
}

export { existingFields, emailFormat, verifyDataLength, charactersValidation, verifyDataBaseConnection }
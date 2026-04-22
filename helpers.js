import { database } from "./configSql.js"

const existingFields = (data) => {
    const { username, email, password } = data

    if (username && email && password) {
        return true
    }
}

const emailFormat = (email) => {
    if (email.endsWith('@gmail.com')) {
        return true
    }
}

const verifyDataBaseConnection = async (request, params = []) => {
    try {
        const [result] = await database.query(request, params)
        return result
    } catch (error) {
        if (error.code === 'ECONNREFUSED' || error.errno === -4078) {
            return 'Could not connect to the database'
        } else if (error.code === 'ER_DUP_ENTRY') {
            return 'The email or the id is being used' // La base de datos tiene como condición que el email y el id sean únicos.
        }
        return error.message
    }
}

export { existingFields, emailFormat, verifyDataBaseConnection }
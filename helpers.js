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

const setIds = (id) => {
    const values = new Set()
    return values.add(id)   // Valida que el ID sea único.
}

const uniqueId = (id) => {
    setIds(id)

    if (setIds(id).has(id)) {
        return false
    }

    return true
}

const verifyDataBaseConnection = async (request, params = []) => {
    try {
        const [result] = await database.query(request, params)
        return result
    } catch (error) {
        if (error.code === 'ECONNREFUSED' || error.errno === -4078) {
            return 'Could not connect to the database'
        }
        return error.message
    }
}

export { existingFields, emailFormat, uniqueId, verifyDataBaseConnection }
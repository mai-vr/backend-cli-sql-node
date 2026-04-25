import { database } from "./configSql.js"
import { existingFields, verifyDataBaseConnection } from "./helpers.js"

const getUsers = async () => {
    const request = `SELECT * FROM users`

    const response = await verifyDataBaseConnection(request)    // Realiza la consulta a la base de datos y si está conectada, devuelve la lista de usuarios, sino lanza un mensaje.
    return response
}

const createUser = async (userData) => {
    const { username, email, password } = userData
    const id = crypto.randomUUID()
    
    const request = `INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)` // Evitar SQL injections con los '?' en VALUES.

    const parameters = [id, username, email, password]

    const response = await verifyDataBaseConnection(request, parameters)    // La query se resuelve en esta función que devolverá los valores esperados o avisará que la base de datos no está conectada.

    if (response.serverStatus === 2) {
        return `
        +++++++++++++++++++++++++++++++++
        +   User created succesfully    +
        +++++++++++++++++++++++++++++++++
        `
        
    } else {
        return response
    }
}

const updateUser = async (id, updates) => {
    const { username, email, password } = updates

    const request = `UPDATE users SET username=?, email=?, password=? WHERE id=?`

    const parameters = [username, email, password, id]
    const response = await verifyDataBaseConnection(request, parameters)

    if (response.serverStatus === 2 && response.affectedRows === 1) {
        return `
        +++++++++++++++++++++++++++++++++
        +   User updated succesfully    +
        +++++++++++++++++++++++++++++++++
        `
    } else {
        return `
        °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
        °   Could not find the user to update   °
        °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
        `
    }
}

const deleteUser = async (id) => {
    const request = `DELETE FROM users WHERE id=?`

    const parameters = id
    const response = await verifyDataBaseConnection(request, parameters)

    if (response.serverStatus === 2 && response.affectedRows === 1) {
        return `
        +++++++++++++++++++++++++++++++++++++++++
        +   The user was deleted succesfully    +
        +++++++++++++++++++++++++++++++++++++++++
        `
    } else {
        return `
        °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
        °   Could not find the user to delete   °
        °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
        `
    }
}

export { getUsers, createUser, updateUser, deleteUser }

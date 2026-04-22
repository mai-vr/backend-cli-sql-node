import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"
import { emailFormat, existingFields } from './helpers.js'

const parameters = process.argv
const values = parameters.slice(2)

const operation = values[0]
// const id = values[1]
const username = values[1]
const email = values[2]
const password = values[3]
const uniqueId = new Set()
let result

const main = async () => {
    switch (operation) {
        case 'get':

            result = await getUsers()
            break

        case 'create':
            const userData = {username: username, email: email, password: password}
            
            if (!existingFields(userData)) {
                result = 'Username, email and password are required'
                break
            } else if (!emailFormat(userData.email)){
                result = 'Invalid format for email, it should ends with @gmail.com'
                break
            }

            result = await createUser(userData)
            break

        case 'update':
            const newUserData = {username: username, email: email, password: password}
            const id = values[4]

            if (!existingFields(newUserData) || !id) {
                result = 'Username, email, password and the id of the user you want to update are needed'
                break
            } else if (!emailFormat(newUserData.email)) {
                result = 'Invalid format for email, it should ends with @gmail.com'
                break
            }

            result = await updateUser(id, newUserData)
            break

        case 'delete':
            const idDeleted = values[1]
            if (!idDeleted) {
                result = 'ID is required'
                break
            }
            
            result = await deleteUser(idDeleted)
            break

        default:
            result = `
            _________________________________
            |                               |
            |           CLI CRUD            |        
            |_______________________________|
            |                               |
            |   Options:                    |
            |   'get' - see all the users.  |
            |   'create' - create a new one.|
            |   'update' - update a user    |
            |   'delete' - delete a user    |
            |_______________________________|
            `
            break
    }

    console.log(result)
}

main()
import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"
import { charactersValidation, emailFormat, existingFields, verifyDataLength } from './helpers.js'

const parameters = process.argv
const values = parameters.slice(2)

const operation = values[0]
const username = values[1]
const email = values[2]
const password = values[3]
let result

const main = async () => {
    switch (operation) {
        case 'get':
            result = await getUsers()
            break

        case 'create':
            const userData = { username: username, email: email, password: password }

            if (!existingFields(userData)) {
                result = 'Username, email and password are required'
                break
            } else if (!emailFormat(userData.email)) {
                result = 'Invalid format for email, it should ends with @gmail.com'
                break
            }

            if (!verifyDataLength(username) || !verifyDataLength(password)) {
                result = 'Password and username must include between 4 and 20 characters'
                break
            }

            if (!charactersValidation(username, 'username')) {
                result = 'Username must contains words'
                break
            } else if (!charactersValidation(password, 'password')) {
                result = 'Password must includes at least a capital letter, a lower case letter and a number'
                break
            }

            result = await createUser(userData)
            break

        case 'update':
            const newUserData = { username: username, email: email, password: password }
            const id = values[4]

            if (!existingFields(newUserData)) {
                result = 'The new username, email and password are needed'
                break
            } else if (!id) {
                result = 'ID is required to know the user to update'
                break
            } else if (!emailFormat(newUserData.email)) {
                result = 'Invalid format for email, it should ends with @gmail.com'
                break
            }

            if (!verifyDataLength(username) || !verifyDataLength(password)) {
                result = 'Password and username must include between 4 and 20 characters'
                break
            }

            if (!charactersValidation(username, 'username')) {
                result = 'Username must contains words'
                break
            } else if (!charactersValidation(password, 'password')) {
                result = 'Incorrect format for password'
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
    setTimeout(() => {
        process.exit(1)
    }, 1500)
}

main()
import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"
import { charactersValidation, emailFormat, existingFields, verifyDataLength } from './helpers.js'

const parameters = process.argv
const values = parameters.slice(2)

const operation = values[0] 
const username = values[1]
const email = values[2]
const password = values[3]
let result  // Variable que se utilizará para mostrar el mensaje correspondiente luego de cada operación.

const main = async () => {
    switch (operation) {
        case 'get':
            result = await getUsers()   // getUsers() es una función asíncrona ya que debe ir a consultar a la base de datos la información a mostrar.
            break

        case 'create':
            const userData = { username: username, email: email, password: password }

            if (!existingFields(userData)) { //Todos los datos son requeridos para crear un usuario.
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   Username, email and password are required. °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            } else if (!emailFormat(userData.email)) { // Solo se aceptan correos electrónicos de gmail.
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °           Invalid format for email.          °           
                °       It should ends with @gmail.com.        °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            }

            if (!verifyDataLength(username) || !verifyDataLength(password)) { // Usurio y contraseña deben tener entre 3 y 20 caracteres.
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   Password and username must include   °       
                °   between 3 and 20 characters          °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            }

            if (!charactersValidation(username, 'username')) {  // Verifica el contenido del username ingresado.
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   Username must contains words   °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            } else if (!charactersValidation(password, 'password')) {
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   Password must includes at least  ° 
                °   a capital letter, a lower case   ° 
                °   letter and a number              °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            }

            result = await createUser(userData)
            break

        case 'update':
            const newUserData = { username: username, email: email, password: password }
            const id = values[4]

            if (!existingFields(newUserData)) { // Todos los campos son requeridos.
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   New username, email and password are required.   °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            } else if (!id) {   // Impedir que se pase a la base de datos sin un id ingresado para buscar al usuario a actualizar.
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   ID is required to know the user to update  °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            } else if (!emailFormat(newUserData.email)) {
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °           Invalid format for email.          °           
                °       It should ends with @gmail.com.        °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            }

            if (!verifyDataLength(username) || !verifyDataLength(password)) {
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   Password and username must include   °       
                °   between 4 and 20 characters          °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            }

            if (!charactersValidation(username, 'username')) {
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   Username must contains words   °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            } else if (!charactersValidation(password, 'password')) {
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   Password must includes at least  ° 
                °   a capital letter, a lower case   ° 
                °   letter and a number              °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
                break
            }

            result = await updateUser(id, newUserData)
            break

        case 'delete':
            const idDeleted = values[1] 
            if (!idDeleted) {   // A partir del id se puede identificar el usuario a borrar, no esperar a llegar a la base de datos para verificar que no se ingresó el dato requerido.
                result = `
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                °   ID is required to know the user to delete  °
                °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
                `
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
    setTimeout(() => {  // Luego de un segundo y medio se puede volver a escribir en la CLI.
        process.exit(1)
    }, 1500)
}

main()
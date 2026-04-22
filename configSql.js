import mysql from 'mysql2/promise'

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    waitForConnections: true,
    connectionLimit: 5
})

export { database }
const odbc = require('odbc')
// const { Connection, Request } = require('tedious')
require('dotenv').config()

const odbcValues = {
    Server: process.env.SQL_SERVER,
    UID: process.env.AZURE_CLIENT_ID,
    PWD: process.env.AZURE_CLIENT_SECRET,
    Authentication: 'ActiveDirectoryServicePrincipal',
    Driver: '{ODBC Driver 18 for SQL Server}',
    Encrypt: 'yes',
}
const connectionString = {
    connectionString: Object.entries(odbcValues).map(([k, v]) => `${k}=${v}`).join(';'),
    connectionTimeout: 20,
    loginTimeout: 20
}

async function connect() {
    const pool = await odbc.pool(connectionString)
    return pool
}

async function query(pool, query) {
    const result = await pool.query(query)
    return result
}

connect().then((pool) => {
    console.log('Connected to SQL server')
    query(pool, "SELECT 'Hello World' as Message").then((result) => {
        result.forEach(element => {
            console.log(element.Message)  
        })
        console.log('Query executed successfully')
    })
})


// const config = {
//     authentication: {
//         type: 'azure-active-directory-service-principal-secret',
//         options: {
//             clientId: process.env.AZURE_CLIENT_ID,
//             tenantId: process.env.AZURE_TENANT_ID,
//             clientSecret: process.env.AZURE_CLIENT_SECRET
//         }
//     },
//     server: process.env.SQL_SERVER,
//     options: {
//         database: process.env.SQL_DATABASE,
//         encrypt: true,
//         // trustServerCertificate: false,
//                 debug: {
//                     packet: true,
//         //            data: true,
//                     payload: true,
//                     token: true
//                 }
//     }
// }


// const connection = new Connection(config)
// connection.on('debug', (msg) => {
//     console.log(msg);
// })
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to SQL server:', err.message);
//     } else {
//         console.log('Connected to SQL server');
//         const query = "SELECT 'Hello World!';"
//         const request = new Request(query, (err, rowCount, rows) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//             } else {
//                 console.log('Query executed successfully');
//                 connection.close()
//             }
//         })
//         connection.execSql(request)
//     }
// })





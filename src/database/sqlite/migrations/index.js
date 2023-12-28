import sqlconnection from '../../sqlite/index.js'
import createUsers from './createUsers.js'

export default async function migrationRun() {
    const schemas = [
        createUsers
    ].join('')

    sqlconnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}
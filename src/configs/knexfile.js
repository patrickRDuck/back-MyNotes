import path from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'database', 'database.db')
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = on', cb)
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'knex', 'migrations')
    }
  },

};

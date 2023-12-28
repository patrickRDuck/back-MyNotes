import config from '../../configs/knexfile.js'
import knex from 'knex'

const connection = knex(config.development)

export { connection }

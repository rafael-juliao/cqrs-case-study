const { asValue } = require("awilix");

const env = process.env.ENV || 'local'
const dotenv = require('dotenv')
const result = dotenv.config({ path: `./src/infrastructure/config/env/${env}.env` })
if (result.error)
    throw new Error(`Failed to load ${env} config`)

module.exports = {
    configuration: asValue(require('./configuration'))
}
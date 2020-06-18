const { asValue } = require('awilix')
module.exports = {
    configuration: asValue(require('./Configuration'))
}
const { asFunction } = require('awilix')
module.exports = {
    logger: asFunction(require('./Logger'))
}
const { asFunction } = require('awilix')
module.exports = {
    registerRoutes: asFunction(require('./RegisterRoutes')),
    requestServer: asFunction(require('./RequestServer'))
}
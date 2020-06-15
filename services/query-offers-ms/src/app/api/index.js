const { asFunction } = require('awilix')
module.exports = {
    queryRouter: asFunction(require('./QueryRouter')),
    queryController: asFunction(require('./QueryController')),
}
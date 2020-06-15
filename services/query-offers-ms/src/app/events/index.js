const { asFunction } = require('awilix')
module.exports = {
    eventDataModelSubscriptor: asFunction(require('./EventDataModelSubscriptor')),
    eventSubscriptor: asFunction(require('./EventSubscriptor')),
    eventDataModel: asFunction(require('./EventDataModel')),
}
const { asFunction } = require('awilix')

module.exports = {
    database: asFunction(require('./MongoDatabase')).singleton(),
    dataQuery: asFunction(require('./MongoDataQueryAdapter')),
    dataPersistence: asFunction(require('./MongoDataPersistenceAdapter')),
}
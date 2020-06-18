const { asFunction, aliasTo } = require('awilix')

module.exports = {
    database: asFunction(require('./MongoDatabase')).singleton(),
    dataQueryInterface: asFunction(require('./MongoDataQueryAdapter')),
    dataPersistenceInterface: asFunction(require('./MongoDataPersistenceAdapter')),
}
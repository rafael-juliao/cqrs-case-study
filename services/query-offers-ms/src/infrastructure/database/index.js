const { asFunction } = require('awilix')
const config = require('../config/configuration')
const Tech = require('../config/tech')

if (config.database === Tech.RedisDB) {
    module.exports = {
        database: asFunction(require('./redis/RedisDB')).singleton(),
        queryInterface: asFunction(require('./redis/RedisQueryAdapter')),
        persistenceInterface: asFunction(require('./redis/RedisPersistenceAdapter')),
    }
}

//const { MongoDB } = require('@rafael-juliao/lib-cqrs-mongo')
if (config.database === Tech.MongoDB) {
    module.exports = {
        database: asFunction(require('./mongo/MongoDB')).singleton(),
        mongoModel: asFunction(require('./mongo/MongoModel')),
        queryInterface: asFunction(require('./mongo/MongoQueryAdapter')),
        persistenceInterface: asFunction(require('./mongo/MongoPersistenceAdapter')),
    }
}
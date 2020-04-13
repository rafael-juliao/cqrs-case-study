const Tech = require('./config/tech')
const config = require('./config')

const { createContainer, asFunction, asValue, InjectionMode } = require('awilix')

const dependencies = createContainer()

dependencies
    .register({
        api: asFunction(require('./app/Api')),
        // dependencies: asValue(dependencies),
        logger: asFunction(require('../lib/arch/log/Logger')),
        messageSubscriber: asFunction(require('../lib/arch/messages/MessageSubscriber')),
        requestServer: asFunction(require('../lib/arch/requests/http/HttpServer')),
        config: asValue(config),
    })

dependencies
    .register({
        eventHandlers: asFunction(require('./app/events/EventHandlers')),
        dataViewModel: asFunction(require('./app/events/DataViewModel')),
        queryRouter: asFunction(require('./app/queries/QueryRouter')),
        queryController: asFunction(require('./app/queries/QueryController')),
    })

/////////////////////////////////////////
// Database Configuration
/////////////////////////////////////////
if (config.database === Tech.MongoDB) {
    dependencies.register({
        database: asFunction(require('../lib/database/mongo/src/MongoDB')).singleton(),
        queryAdapter: asFunction(require('./app/database/mongo/MongoQueryAdapter')),
        offersPersistence: asFunction(require('./app/database/mongo/MongoOffersPersistenceAdapter')),
        productsPersistence: asFunction(require('./app/database/mongo/MongoProductsPersistenceAdapter')),
    })
}

if (config.database === Tech.RedisDB) {
    dependencies.register({
        database: asFunction(require('../lib/database/redis/RedisDB')).singleton(),
        queryAdapter: asFunction(require('./app/database/redis/RedisQueryAdapter')),
        offersPersistence: asFunction(require('./app/database/redis/RedisOffersPersistenceAdapter')),
        productsPersistence: asFunction(require('./app/database/redis/RedisOffersPersistenceAdapter')),
    })
}

/////////////////////////////////////////
// Message Broker Configuration
/////////////////////////////////////////

if (config.messageBroker === Tech.RabbitMQ) {
    dependencies.register({
        messageBroker: asFunction(require('../lib/message/rabbit/RabbitMQ')).singleton(),
    })
}

if (config.messageBroker === Tech.AzureServiceBus) {
    dependencies.register({
        messageBroker: asFunction(require('../lib/messages/azure/AzureServiceBus')).singleton(),
    })
}

module.exports = {
    //dependencies,
    createAPI: () => dependencies.resolve('api'),
    createDatabase: () => dependencies.resolve('database'),
    createMessageBroker: () => dependencies.resolve('messageBroker')
}




// dependencies
//     .loadModules(
//         [
//             'app/events/**/*.js',
//             'app/queries/**/*.js',
//         ],
//         {
//             formatName: 'camelCase',
//             resolverOptions: {
//                 injectionMode: InjectionMode.PROXY
//             }
//         }
//     )

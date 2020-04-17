const Tech = require('./config/tech')
const config = require('./config')

const { createContainer, asFunction, asValue, InjectionMode } = require('awilix')

const dependencies = createContainer()

const {
    Logger,
    MessageSubscriber,
    RequestServer
} = require('@rafael-juliao/lib-cqrs-service')

dependencies
    .register({
        api: asFunction(require('./app/Api')),
        logger: asFunction(Logger),
        messageSubscriber: asFunction(MessageSubscriber),
        requestServer: asFunction(RequestServer),
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
    const { MongoDB } = require('@rafael-juliao/lib-cqrs-mongo')
    dependencies.register({
        database: asFunction(MongoDB).singleton(),
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
        messageBroker: asFunction(require('@rafael-juliao/lib-cqrs-rabbitmq')).singleton(),
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

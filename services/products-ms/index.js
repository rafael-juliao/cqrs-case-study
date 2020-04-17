import arch from '@rafael-juliao/lib-microservice'

const {
    Logger: logger,
    MongoDB: database,
    RabbitMQ: messageBroker,
    HttpServer: requestServer,
} = arch

import productsRouter from './src/ProductsRouter.mjs'
import config from './src/Config.mjs'

(async () => {
    logger.info('[APP] Application Starting...')
    await database.connect(config)
    await messageBroker.connect(config)
    await requestServer.start(config, [
        productsRouter()
    ])
    logger.info('[APP] Application Running')
})()
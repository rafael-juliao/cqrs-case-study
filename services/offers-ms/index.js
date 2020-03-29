import logger from './arch/Logger.mjs'
import mongoDB from  './arch/MongoDB.mjs'
import rabbitMQ from './arch/RabbitMQ.mjs'
import httpServer from './arch/HttpServer.mjs'
import offersRouter from './src/OffersRouter.mjs'

(async () => {
    logger.info('[APP] Application Starting...')
    await mongoDB.connect()
    await rabbitMQ.connect()
    await httpServer.start([
        offersRouter()
    ])
    logger.info('[APP] Application Running')
})()
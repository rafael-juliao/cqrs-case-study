import logger from './Logger.mjs'

import mongoDB from  './MongoDB.mjs'
import rabbitMQ from './RabbitMQ.mjs'
import httpServer from './HttpServer.mjs'

export default {
    start: async () => {
        logger.info('[APP] Application Starting...')
        await mongoDB.connect()
        await rabbitMQ.connect()
        await httpServer.start()
        logger.info('[APP] Application Running')
    }
}
import logger from '../.arch/src/Logger.mjs'
import mongoDB from  '../.arch/src/MongoDB.mjs'
import rabbitMQ from '../.arch/src/RabbitMQ.mjs'
import httpServer from '../.arch/src/HttpServer.mjs'
import productsRouter from './src/ProductsRouter.mjs'

(async () => {
    logger.info('[APP] Application Starting...')
    await mongoDB.connect()
    await rabbitMQ.connect()
    await httpServer.start([
        productsRouter()
    ])
    logger.info('[APP] Application Running')
})()
import MongoDB from  './MongoDB.mjs'
import RabbitMQ from './RabbitMQ.mjs'
import HttpServer from './HttpServer.mjs'

export default {
    start: async () => {
        await MongoDB.connect()
        await RabbitMQ.connect()
        await HttpServer.start()
    },
    MongoDB,
    RabbitMQ,
}
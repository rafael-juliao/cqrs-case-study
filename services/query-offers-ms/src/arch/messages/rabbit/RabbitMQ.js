const config = require('../../config/local')
const amqpClient = require('amqplib')

const buildRabbitUrl = () => {
    const rabbitUrl = `amqp://${config.rabbitUrl}:${config.rabbitPort}`
    logger.secret(`[RABBIT] URL: ${rabbitUrl}`)
    return rabbitUrl
}

module.exports = {
    connect: async function () {
        logger.info('[RABBIT] Connecting to rabbit message queue...')
        
        let connection
        try {            
            connection = await amqpClient.connect(buildRabbitUrl())
        } catch (err) {
            throw new Error('Failed to connect to rabbitMQ', err.message)
        }

        let channel
        try {            
            channel = await connection.createChannel()
        } catch (err) {
            throw new Error('Failed to create channel in rabbitMQ', err.message)
        }

        Object.assign(this, {
            subscribe: async ({ exchange }, handler) => {
                logger.info(`[RABBIT] Connecting to exchange: ${exchange}`)
                channel.assertExchange(exchange, 'fanout', { durable: false });
                const { queue } = await ch.assertQueue('', { exclusive: true })
                channel.bindQueue(queue, exchange, '')
                channel.consume(queue, handler, { noAck: true })
            }
        })
        
        logger.info('[RABBIT] Connected to rabbit message queue')
    }
}
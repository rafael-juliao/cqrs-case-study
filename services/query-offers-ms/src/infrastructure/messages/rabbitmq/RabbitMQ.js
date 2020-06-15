const amqpClient = require('amqplib')
const RabbitMessage = require('./RabbitMessage')

const buildRabbitUrl = configuration => `amqp://${configuration.messageChannelUrl}:${configuration.messageChannelPort}`

module.exports = ({ configuration, logger }) => ({
    connect: async function () {
        logger.info('[RABBIT] Connecting to rabbit message queue...')
        
        let connection
        try {            
            connection = await amqpClient.connect(buildRabbitUrl(configuration))
        } catch (err) {
            throw new Error('Failed to connect to rabbitMQ', err.message)
        }

        logger.info('[RABBIT] Connected to rabbitMQ')
        const createChannel = async function () {
            let channel
            try {
                channel = await connection.createChannel()
            } catch (err) {
                throw new Error('Failed to create channel in rabbitMQ', err.message)
            }
            return channel
        }

        Object.assign(this, {
            createChannel,
            disconnect: () => {
                connection.close()
                logger.info('[RABBIT] Disconnected from rabbitMQ')
            }
        
        })
    },

    publish: async function ({ topic }, object) {
        if (!this.publisherChannel)
            Object.assign(this, {
                publisherChannel: await this.createChannel()
            })
        this.publisherChannel.assertExchange(topic, 'fanout', { durable: true });
        this.publisherChannel.publish(topic, '', Buffer.from(JSON.stringify(object)), { persistent: true })
        logger.info(`[RABBIT] Message sent | topic: ${topic}`)
    },

    subscribe: async function(event, handler) {
        const { exchange, queue } = configuration.getEvent(event)
        const subscriberChannel = await this.createChannel()
        subscriberChannel.assertExchange(exchange, 'fanout', { durable: true });
        const { queue: subscriberQueue } = await subscriberChannel.assertQueue(queue)
        subscriberChannel.bindQueue(subscriberQueue, exchange, '')
        subscriberChannel.consume(subscriberQueue, message => handler(RabbitMessage(subscriberChannel, message)), { noAck: false })
        logger.info(`[RABBIT] Subscribe to topic: ${exchange}`)
    }
})
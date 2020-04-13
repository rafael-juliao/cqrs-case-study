const amqpClient = require('amqplib')
const RabbitMessage = require('./RabbitMessage')

const buildRabbitUrl = config => `amqp://${config.messageBrokerUrl}:${config.messageBrokerPort}`

module.exports = ({ config, logger }) => ({
    connect: async function () {
        logger.info('[RABBIT] Connecting to rabbit message queue...')
        
        let connection
        try {            
            connection = await amqpClient.connect(buildRabbitUrl(config))
        } catch (err) {
            throw new Error('Failed to connect to rabbitMQ', err.message)
        }

        logger.info('[RABBIT] Connected to rabbit message queue')
        const createChannel = async function () {
            let channel
            try {
                channel = await connection.createChannel()
            } catch (err) {
                throw new Error('Failed to create channel in rabbitMQ', err.message)
            }
            return channel
        }

        Object.assign(this, { createChannel })
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

    subscribe: async function({ exchange, queue }, handler) {
        const subscriberChannel = await this.createChannel()
        subscriberChannel.assertExchange(exchange, 'fanout', { durable: true });
        const { queue: subscriberQueue } = await subscriberChannel.assertQueue(queue)
        subscriberChannel.bindQueue(subscriberQueue, exchange, '')
        subscriberChannel.consume(subscriberQueue, message => handler(RabbitMessage(subscriberChannel, message)), { noAck: false })
    }
})






/*
module.exports = ({ logger, config }) => ({
    connect: async function () {
        logger.info('[RABBIT] Connecting to rabbit message queue...')
        
        let connection
        try {            
            connection = await amqpClient.connect(buildRabbitUrl(config))
        } catch (err) {
            throw new Error('Failed to connect to rabbitMQ', err.message)
        }

        Object.assign(this, {
            subscribe: async (event, handler) => {
                let channel
                try {            
                    channel = await connection.createChannel()
                } catch (err) {
                    throw new Error('Failed to create channel in rabbitMQ', err.message)
                }
                const { topic, subscriber } = config.events[event]
                logger.info(`[RABBIT] Connecting to topic: ${topic}`)
                channel.assertExchange(topic, 'fanout', { durable: true });
                const { queue } = await ch.assertQueue(subscriber)
                channel.bindQueue(queue, topic, '')
                channel.consume(queue, message => handler(RabbitMessage(message)), { noAck: false })
            },

            publish: async (event, object) => {


                let channel
                try {            
                    channel = await connection.createChannel()
                } catch (err) {
                    throw new Error('Failed to create channel in rabbitMQ', err.message)
                }
                const { topic } = config.events[event]
                channel.assertExchange(topic, 'fanout', { durable: true });
                channel.publish(topic, '', Buffer.from(JSON.stringify(object)))
                logger.info(`[RABBIT] Message sent | topic: ${topic}`)
            }

        })
        
        logger.info('[RABBIT] Connected to rabbit message queue')
    }
})*/
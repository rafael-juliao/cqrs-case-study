const RabbitMessage = require('./RabbitMessage')

module.exports = ({ logger, messageBroker, configuration }) => ({
    publish: async function ({ topic }, object) {
        if (!this.publisherChannel)
            Object.assign(this, {
                publisherChannel: await messageBroker.createChannel()
            })
        this.publisherChannel.assertExchange(topic, 'fanout', { durable: true });
        this.publisherChannel.publish(topic, '', Buffer.from(JSON.stringify(object)), { persistent: true })
        logger.info(`[RABBIT] PUB => Message sent | topic: ${topic}`)
    },

    subscribe: async function(event, handler) {
        const { exchange, queue } = configuration.events[event]
        const subscriberChannel = await messageBroker.createChannel()
        subscriberChannel.assertExchange(exchange, 'fanout', { durable: true });
        const { queue: subscriberQueue } = await subscriberChannel.assertQueue(queue)
        subscriberChannel.bindQueue(subscriberQueue, exchange, '')
        subscriberChannel.consume(subscriberQueue, message => handler(RabbitMessage(subscriberChannel, message)), { noAck: false })
        logger.info(`[RABBIT] SUB => Subscribed to topic: ${exchange}`)
    },

    unsubscribe: async function(event) {
        logger.info(`[RABBIT] UNSUB => Unsubscribed from topic: ${event}`)
    }
})
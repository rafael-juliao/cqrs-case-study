const amqpClient = require('amqplib')

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
        
        Object.assign(this, {
            createChannel: async function () {
                let channel
                try {
                    channel = await connection.createChannel()
                } catch (err) {
                    throw new Error('Failed to create channel in rabbitMQ', err.message)
                }
                return channel
            },
            disconnect: () => {
                connection.close()
                logger.info('[RABBIT] Disconnected from rabbitMQ')
            }
        
        })
    },


})
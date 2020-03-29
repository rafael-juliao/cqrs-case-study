import config from './Config.mjs'
import logger from './Logger.mjs'
import amqpClient from 'amqplib'

const buildRabbitUrl = () => {
    const rabbitUrl = `amqp://${config.rabbitUrl}:${config.rabbitPort}`
    logger.secret(`[RABBIT] URL: ${rabbitUrl}`)
    return rabbitUrl
}

export default {
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
            publish: async (queue, object) => {
                const message = JSON.stringify(object)
                await channel.assertQueue(queue)
                await channel.sendToQueue(queue, Buffer.from(message))
                logger.info(`[RABBIT] Message sent | queue: ${queue} | data : ${message}`)
            }
        })
        
        logger.info('[RABBIT] Connected to rabbit message queue')
    }
}
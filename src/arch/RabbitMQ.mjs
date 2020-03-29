import config from './Config.mjs'
import logger from './Logger.mjs'
import amqpClient from 'amqplib'

const buildRabbitUrl = () => `amqp://${config.rabbitUrl}:${config.rabbitPort}`

export default {
    connect: async function () {
        logger.info('[RABBIT] Connecting to rabbit message queue...')
        try {            
            const connection = await amqpClient.connect(buildRabbitUrl())
            const channel = await connection.createChannel()
            Object.assign(this, {
                publish: async (queue, object) => {
                    const message = JSON.stringify(object)
                    await channel.assertQueue(queue)
                    await channel.sendToQueue(queue, Buffer.from(message))
                    logger.info(`[RABBIT] Message sent | queue: ${queue} | data : ${message}`)
                }
            })
        } catch (err) {
            throw new Error('Failed to connect to rabbitMq')
        }
        logger.info('[RABBIT] Connected to rabbit message queue')
    }
}
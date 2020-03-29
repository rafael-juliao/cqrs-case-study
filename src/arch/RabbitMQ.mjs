import amqpClient from 'amqplib'
import config from './Config.mjs'

export default {
    connect: async function () {
        try {
            const connection = await amqpClient.connect(config.rabbitUrl)
            const channel = await connection.createChannel()
            Object.assign(this, {
                publish: async (queue, message) => {
                    await channel.assertQueue(queue)
                    await channel.sendToQueue(queue, Buffer.from(message))
                }
            })

        } catch (err) {
            throw new Error('Failed to connect to rabbitMq')
        }
    }
}
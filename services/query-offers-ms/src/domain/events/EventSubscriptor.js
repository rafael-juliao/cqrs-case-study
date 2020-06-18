module.exports = ({ logger, messageChannel }) => ({

    subscribe: async (event, operation) => {
        const messageListener = async message => {
            logger.info(`[MESSAGE] Received: ${event}` )
            try {
                const result = await operation(message.getBody())
                message.sendToComplete(result)
            } catch (err) {
                message.sendToDeadLetter(err)
            }
        }
        await messageChannel.subscribe(event, messageListener)
    },

    unsubscribe: async (event) => await messageChannel.unsubscribe(event)
})
module.exports = ({ logger, messageChannelInterface }) => ({
    subscribe: async (event, operation) => {
        await messageChannelInterface.subscribe(event, async eventMessage => {
            logger.info(`[MESSAGE] Received: ${event}` )
            try {
                const result = await operation(eventMessage.getBody())
                eventMessage.sendToComplete(result)
            } catch (err) {
                eventMessage.sendToDeadLetter(err)
            }
        })
    }
})
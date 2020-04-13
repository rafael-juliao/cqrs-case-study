module.exports = ({
    config,
    logger,
    eventHandlers,
    messageBroker,
}) => ({
    subscribeToEvents: async function () {
        for (const { event, handler } of eventHandlers) {
            await messageBroker.subscribe(config.events[event], async message => {
                logger.info(`[EVENT] Received: ${event}` )
                try {
                    await handler(message.getBody())
                    message.complete()
                } catch (err) {
                    message.sendToDeadLetter(err)
                }
            })
            logger.info(`[SUBSCRIBER] Subscribed to event: ${event}`)
        }
    }
})
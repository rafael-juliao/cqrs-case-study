module.exports = ({
    config,
    logger,
    eventHandlers,
    messageBroker,
}) => ({
    subscribeToEvents: async () => {
        for (let { event, handler } of eventHandlers) {
            await messageBroker.subscribe(config.events[event], async message => {
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
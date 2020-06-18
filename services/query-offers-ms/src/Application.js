module.exports = ({
    logger,
    database,
    messageBroker,
    eventDataModelSubscriptor,
    queryServer,
}) => ({
    start: async () => {
        logger.info('[APP] Starting...')
        await database.connect()
        await messageBroker.connect()
        await eventDataModelSubscriptor.subscribe()
        await queryServer.start()
        logger.info('[APP] Started')
    },
    stop: async () => {
        logger.info('[APP] Stopping...')
        await queryServer.stop()
        await eventDataModelSubscriptor.unsubscribe()
        await messageBroker.disconnect()
        await database.disconnect()
        logger.info('[APP] Stopped')
    }
})
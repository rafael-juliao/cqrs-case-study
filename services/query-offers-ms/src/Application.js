module.exports = ({
    logger,
    database,
    messageChannelInterface,
    eventDataModelSubscriptor,
    requestServer,
}) => ({
    start: async () => {
        logger.info('[APP] Started...')
        await database.connect()
        await messageChannelInterface.connect()
        await eventDataModelSubscriptor.subscribe()
        await requestServer.start()
    },
    stop: async () => {
        logger.info('[APP] Stopped...')
        await requestServer.stop()
        await messageChannelInterface.disconnect()
        await database.disconnect()
    }
})
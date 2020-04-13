module.exports = ({
    logger,
    messageSubscriber,
    requestServer
}) => ({
    start: async () => {
        logger.info('[API] Starting API...')
        await requestServer.startListen()
        await messageSubscriber.subscribeToEvents()
        logger.info('[API] API Running...')
    }
})
const express = require('express')

module.exports = ({
    logger,
    configuration,
    queryRouter
}) => ({
    start: async function () {
        const app = express()
        app.use('/api', queryRouter)        
        const server = app.listen(configuration.httpPort)
        logger.info(`[HTTP] Started listening at ${configuration.httpPort}...`)
        Object.assign(this, {
            stop: () => {
                server.close()
                logger.info(`[HTTP] Stopped listening at ${configuration.httpPort}...`)
            }
        })
    },
    stop: () => {},
})
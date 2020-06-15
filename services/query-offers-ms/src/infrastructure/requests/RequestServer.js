const express = require('express')
const { Router } = express
const bodyParser = require('body-parser')

module.exports = ({
    logger,
    configuration,
    registerRoutes,
}) => ({
    start: async function () {
        const app = express()
        const router = Router()
        router.use(bodyParser.json())
        registerRoutes(router)
        app.use('/api', router)        
        const server = app.listen(configuration.httpPort)
        logger.info(`[HTTP] listening at ${configuration.httpPort}...`)
        Object.assign(this, {
            stop: () => {
                server.close()
                logger.info(`[HTTP] Stoped listening at ${configuration.httpPort}`)
            } 
        })
    }
})

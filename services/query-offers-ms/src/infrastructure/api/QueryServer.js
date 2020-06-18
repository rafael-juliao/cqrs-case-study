const express = require('express')
const { Router } = express
const bodyParser = require('body-parser')

module.exports = ({
    logger,
    configuration,
    queryRouter
}) => ({
    start: async function () {
        const app = express()
        const router = Router()
        router.use(bodyParser.json())
        for (const { path, validator, controller } of queryRouter) 
            router.get(path, validator, controller)
        app.use('/api', router)        
        const server = app.listen(configuration.httpPort)
        logger.info(`[HTTP] Started listening at ${configuration.httpPort}...`)
        Object.assign(this, {
            stop: () => {
                server.close()
                logger.info(`[HTTP] Stopped listening at ${configuration.httpPort}`)
            } 
        })
    }
})

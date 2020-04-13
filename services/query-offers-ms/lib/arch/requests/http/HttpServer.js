const express = require('express')
const { Router } = express
const bodyParser = require('body-parser')
const HttpValidator = require('./HttpValidator')

module.exports = ({
    logger,
    config,
    queryRouter,
}) => ({
    startListen: async () => {
        const server = express()
        const api = Router()
        api.use(bodyParser.json())
        queryRouter.forEach(({ path, schema, handler }) => api.get(path, HttpValidator.create(schema), handler))
        server.use('/api', api)        
        server.listen(config.httpPort)
        logger.info(`[HTTP] listening at ${config.httpPort}...`)
    }
})

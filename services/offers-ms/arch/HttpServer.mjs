import logger from './Logger.mjs'
import config from './Config.mjs'
import express from 'express'
import httpErrorMiddleware from './HttpErrorMiddleware.mjs'
import bodyParser from 'body-parser'

export default {
    start: async (appRouters) => {
        const server = express()
        const api = express.Router()
        api.use(bodyParser.json())
        appRouters.forEach(router => api.use(router))
        server.use('/api', api)
        server.use(httpErrorMiddleware())
        server.listen(config.httpPort)
        logger.info(`[HTTP] listening at ${config.httpPort}...`)
    }
}
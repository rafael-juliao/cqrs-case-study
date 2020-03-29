import logger from './Logger.mjs'
import config from './Config.mjs'
import express from 'express'
import offersController from '../app/OffersController.mjs'
import httpErrorMiddleware from './HttpErrorMiddleware.mjs'
import bodyParser from 'body-parser'

export default {
    start: async () => {
        const server = express()
        const api = express.Router()
        api.use(bodyParser.json())
        api.use(offersController())
        api.use(httpErrorMiddleware())
        server.use('/api', api)
        server.listen(config.serverPort)
        logger.info(`[HTTP] listening at ${config.serverPort}...`)
    }
}
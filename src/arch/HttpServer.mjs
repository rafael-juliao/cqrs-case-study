import express from 'express'
import offersController from '../app/OffersController.mjs'
import httpErrorMiddleware from './HttpErrorMiddleware.mjs'

export default {
    start: async () => {
        const server = express()
        const api = express.Router()
        api.use(offersController())
        api.use(httpErrorMiddleware())
        server.use('/api', api)
        server.listen()
    }
}
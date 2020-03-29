import logger from '../../.arch/Logger.mjs'
import HttpServer from '../../.arch/HttpServer.mjs'
const { Router } = HttpServer
import offersController from './OffersController.mjs'

export default () => {
    logger.info(`[HTTP] Creating offers controller`)
    const offersRouter = Router()
    offersRouter.post('/offers', offersController.createOffer)
    offersRouter.patch('/offers/:offerId/status', offersController.changeStatus)
    return offersRouter
}
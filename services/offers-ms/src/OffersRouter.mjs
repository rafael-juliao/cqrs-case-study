import logger from '../../.arch/src/Logger.mjs'
import HttpServer from '../../.arch/src/HttpServer.mjs'
import offersController from './OffersController.mjs'

export default () => {
    logger.info('[HTTP] Creating offers controller')
    const { Router } = HttpServer
    const offersRouter = Router()
    offersRouter.post('/offers', offersController.createOffer)
    offersRouter.patch('/offers/:offerId/status', offersController.changeStatus)
    offersRouter.get('/offers/:offerId', offersController.getOfferById)
    return offersRouter
}
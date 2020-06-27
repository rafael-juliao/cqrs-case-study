import arch from '@rafael-juliao/lib-microservice'
const {
    Logger: logger,
    HttpServer: { Router },
} = arch
import offersController from './OffersController.mjs'

export default () => {
    logger.info('[HTTP] Creating offers controller')
    const offersRouter = Router()
    offersRouter.post('/offers', offersController.createOffer)
    offersRouter.put('/offers/:offerId', offersController.updateOffer)
    offersRouter.get('/offers/:offerId', offersController.getOfferById)
    offersRouter.get('/offers', offersController.searchOffers)
    return offersRouter
}
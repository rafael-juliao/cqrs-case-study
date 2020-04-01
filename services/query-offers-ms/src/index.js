import arch from '../arch'
const { database, messageSubscriber, httpServer } = arch
import OffersEventHandler from './offers/OffersEventHandler'
import OffersController from './offers/OffersController'
import ProductsEventHandler from './products/ProductsEventHandler'

(async () => {
    // Connect Database
    database.connect()

    // Subscribe to Message Broker
    messageSubscriber.subscribe([
        OffersEventHandler,
        ProductsEventHandler
    ])

    // Start Http Server
    httpServer.start([
        OffersController
    ])

})()

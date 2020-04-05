import database from database
import messageSubscriber from messageSubscriber
import httpServer from '../src/arch/requests/HttpServer'
import offersController from './offers/OffersController'

const startApplication = async () => {
    await database.connect()
    await messageSubscriber.subscribe(eventHandlers)
    httpServer.start([
        offersController
    ])
}

startApplication()
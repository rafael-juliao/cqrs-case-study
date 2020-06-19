const { Router } = require('express')
const bodyParser = require('body-parser')
    
const createRouter = routes => {
    const router = Router()
    router.use(bodyParser.json())
    for (const { path, validator, controller } of routes) 
        router.get(path, validator, controller)
    return router
}

module.exports = ({ queryController, queryValidator }) => createRouter([
    {
        path: '/offers/:offerId',
        validator: queryValidator.getOfferById,
        controller: queryController.getOfferById,
    },
    {
        path: '/offers',
        validator: queryValidator.searchOffers,
        controller: queryController.searchOffers,
    },
])
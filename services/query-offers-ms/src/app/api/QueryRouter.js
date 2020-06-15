const QuerySchemas = require('./QuerySchemas')

module.exports = ({ queryController }) => [
    {
        path: '/offers/:offerId',
        controller: queryController.getOfferById,
        schema: QuerySchemas.getOfferById
    },
    {
        path: '/offers',
        controller: queryController.searchOffers,
        schema: QuerySchemas.searchOffers
    }
]
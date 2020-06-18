const QueryValidator = require('./QueryValidator')

module.exports = ({ queryController }) => [
    {
        path: '/offers/:offerId',
        controller: queryController.getOfferById,
        validator: QueryValidator.getOfferById
    },
    {
        path: '/offers',
        controller: queryController.searchOffers,
        validator: QueryValidator.searchOffers
    }
]
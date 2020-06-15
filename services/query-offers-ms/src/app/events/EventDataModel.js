const Events = require('./DomainEvents')

module.exports = ({ persistenceInterface }) => [
    {
        event: Events.OFFER_CREATED,
        operation: async offer => await persistenceInterface.createOffer(offer),
    },
    {
        event: Events.OFFER_UPDATED,
        operation: async offer => await persistenceInterface.updateOffer(offer._id, offer),
    },
    {
        event: Events.OFFER_STATUS_CHANGED,
        operation: async offer => await persistenceInterface.updateOffer(offer._id, offer),
    },
    {
        event: Events.PRODUCT_CREATED,
        operation: async product => await persistenceInterface.createProduct(product),
    },
    {
        event: Events.PRODUCT_UPDATED,
        operation: async product => await persistenceInterface.updateProduct(product._id, product),
    },
    {
        event: Events.PRODUCT_STATUS_CHANGED,
        operation: async product => await persistenceInterface.updateProduct(product._id, product),
    },
]
const Events = require('./DomainEvents')

module.exports = ({ dataPersistenceInterface }) => [
    {
        event: Events.OFFER_CREATED,
        operation: async offer => await dataPersistenceInterface.createOffer(offer),
    },
    {
        event: Events.OFFER_UPDATED,
        operation: async offer => await dataPersistenceInterface.updateOffer(offer._id, offer),
    },
    {
        event: Events.OFFER_STATUS_CHANGED,
        operation: async offer => await dataPersistenceInterface.updateOffer(offer._id, offer),
    },
    {
        event: Events.PRODUCT_CREATED,
        operation: async product => await dataPersistenceInterface.createProduct(product),
    },
    {
        event: Events.PRODUCT_UPDATED,
        operation: async product => await dataPersistenceInterface.updateProduct(product._id, product),
    },
    {
        event: Events.PRODUCT_STATUS_CHANGED,
        operation: async product => await dataPersistenceInterface.updateProduct(product._id, product),
    },
]
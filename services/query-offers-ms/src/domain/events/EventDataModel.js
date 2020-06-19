const DomainEvents = require('./DomainEvents')

module.exports = ({ dataPersistence }) => [
    {
        event: DomainEvents.OFFER_CREATED,
        operation: async offer =>
            await dataPersistence.createOffer(offer),
    },
    {
        event: DomainEvents.OFFER_UPDATED,
        operation: async offer =>
            await dataPersistence.updateOffer(offer._id, offer),
    },
    {
        event: DomainEvents.OFFER_STATUS_CHANGED,
        operation: async offer =>
            await dataPersistence.updateOffer(offer._id, offer),
    },
    {
        event: DomainEvents.PRODUCT_CREATED,
        operation: async product =>
            await dataPersistence.createProduct(product),
    },
    {
        event: DomainEvents.PRODUCT_UPDATED,
        operation: async product =>
            await dataPersistence.updateProduct(product._id, product),
    },
    {
        event: DomainEvents.PRODUCT_STATUS_CHANGED,
        operation: async product =>
            await dataPersistence.updateProduct(product._id, product),
    },
]
const Events = require('../../domain/replication/DomainEvents')

module.exports = {

    [Events.OFFER_CREATED]: {
        topic: 'offer-created',
    },

    [Events.OFFER_UPDATED]: {
        topic: 'offer-updated',
    },

    [Events.PRODUCT_CREATED]: {
        topic: 'product-created',
    },

    [Events.PRODUCT_UPDATED]: {
        topic: 'product-updated',
    },
    
}
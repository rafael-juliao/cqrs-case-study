const Events = require('../../domain/events/DomainEvents')

module.exports = {
    [Events.OFFER_CREATED]: {
        topic: 'offer-created',
    },

    [Events.OFFER_UPDATED]: {
        topic: 'offer-update',
    },

    [Events.OFFER_STATUS_CHANGED]: {
        topic: 'offer-status-changed',
    },
    [Events.PRODUCT_CREATED]: {
        topic: 'product-created',
    },

    [Events.PRODUCT_UPDATED]: {
        topic: 'product-update',
    },

    [Events.PRODUCT_STATUS_CHANGED]: {
        topic: 'product-status-changed',
    },
}
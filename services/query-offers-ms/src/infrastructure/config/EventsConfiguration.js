const Events = require('../../domain/events/DomainEvents')

module.exports = {
    [Events.OFFER_CREATED]: {
        topic: 'offer-created',
        queue: 'offer-created_query-offers-ms',
    },

    [Events.OFFER_UPDATED]: {
        topic: 'offer-update',
        queue: 'offer-update_query-offers-ms',
    },

    [Events.OFFER_STATUS_CHANGED]: {
        topic: 'offer-status-changed',
        queue: 'offer-status-changed_query-offers-ms',
    },
    [Events.PRODUCT_CREATED]: {
        topic: 'product-created',
        queue: 'product-created_query-offers-ms',
    },

    [Events.PRODUCT_UPDATED]: {
        topic: 'product-update',
        queue: 'product-update_query-offers-ms',
    },

    [Events.PRODUCT_STATUS_CHANGED]: {
        topic: 'product-status-changed',
        queue: 'product-status-changed_query-offers-ms',
    },
}
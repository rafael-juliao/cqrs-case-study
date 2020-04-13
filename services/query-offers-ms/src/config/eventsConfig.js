const Events = require('../app/events/DomainEvents')
const Tech = require('./tech')

module.exports = messageBroker => ({
    [Tech.AzureServiceBus]: {
        [Events.OFFER_CREATED]: {
            connectionString: '',
            topicName: '',
        }
    },

    [Tech.RabbitMQ]: {
        [Events.OFFER_CREATED]: {
            exchange: 'offer-created',
            queue: 'query-offers-ms',
        },

        [Events.OFFER_UPDATED]: {
            exchange: 'offer-update',
            queue: 'query-offers-ms',
        },

        [Events.OFFER_STATUS_CHANGED]: {
            exchange: 'offer-status-changed',
            queue: 'query-offers-ms',
        },
        [Events.PRODUCT_CREATED]: {
            exchange: 'product-created',
            queue: 'query-offers-ms',
        },

        [Events.PRODUCT_UPDATED]: {
            exchange: 'product-update',
            queue: 'query-offers-ms',
        },

        [Events.PRODUCT_STATUS_CHANGED]: {
            exchange: 'product-status-changed',
            queue: 'query-offers-ms',
        },
    }
})[messageBroker]
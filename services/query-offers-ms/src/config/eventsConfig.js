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
            queue: 'offer-created_query-offers-ms',
        },

        [Events.OFFER_UPDATED]: {
            exchange: 'offer-update',
            queue: 'offer-update_query-offers-ms',
        },

        [Events.OFFER_STATUS_CHANGED]: {
            exchange: 'offer-status-changed',
            queue: 'offer-status-changed_query-offers-ms',
        },
        [Events.PRODUCT_CREATED]: {
            exchange: 'product-created',
            queue: 'product-created_query-offers-ms',
        },

        [Events.PRODUCT_UPDATED]: {
            exchange: 'product-update',
            queue: 'product-update_query-offers-ms',
        },

        [Events.PRODUCT_STATUS_CHANGED]: {
            exchange: 'product-status-changed',
            queue: 'product-status-changed_query-offers-ms',
        },
    }
})[messageBroker]
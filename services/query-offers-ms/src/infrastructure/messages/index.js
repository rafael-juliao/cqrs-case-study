const { asFunction } = require('awilix')
const config = require('../config/configuration')
const Tech = require('../config/tech')

if (config.messageChannel === Tech.RabbitMQ) {
    module.exports = {
        messageChannelInterface: asFunction(require('./rabbitmq/RabbitMQ')).singleton(),
    }
}

if (config.messageChannel === Tech.AzureServiceBus) {
    module.exports = {
        messageChannelInterface: asFunction(require('../lib/messages/azure/AzureServiceBus')).singleton(),
    }
}

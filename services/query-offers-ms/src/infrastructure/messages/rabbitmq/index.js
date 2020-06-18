const { asFunction } = require('awilix')
module.exports = {
    messageBroker: asFunction(require('./RabbitMQ')).singleton(),
    messageChannel: asFunction(require('./RabbitMessageChannel')),
}
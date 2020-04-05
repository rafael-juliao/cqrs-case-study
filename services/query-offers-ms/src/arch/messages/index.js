module.exports =
    config.env === 'production' ?
    require('./azure/AzureServiceBus')
        : require('./rabbit/RabbitMQ')
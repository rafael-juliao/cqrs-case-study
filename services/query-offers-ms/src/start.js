const {
    database,
    messageBroker,
    messageSubscriber,
    requestServer
} = require('./arch')

module.exports = {
    start: async () => {
        await database.connect()
        await messageBroker.connect()
        messageSubscriber.subscribe(require('./app/events/EventHandlers'))
        requestServer.start(require('./app/queries/QueryRouter'))
    }
}
module.exports = {
    start: async () => {
        const config = require('./config')
        config.load()
        const dependencies = require('./dependencies')
        const database = dependencies.createDatabase()
        const messageBroker = dependencies.createMessageBroker()
        await database.connect()
        await messageBroker.connect()
        const api = dependencies.createAPI()
        await api.start()
    }
}
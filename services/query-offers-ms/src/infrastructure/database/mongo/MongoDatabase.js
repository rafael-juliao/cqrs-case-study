const { MongoClient, ObjectID } = require('mongodb')

const buildMongoUrl = configuration => {
    const mongoUrl = `mongodb://${configuration.databaseUrl}:${configuration.databasePort}`
    return mongoUrl
}

module.exports = ({ logger, configuration }) => ({

    mongoId: id => new ObjectID(id),

    connect: async function () {
        logger.info('[MONGO] Connecting to mongo database...')

        const client = new MongoClient(buildMongoUrl(configuration), { useUnifiedTopology: true, useNewUrlParser: true });
        try {
            await client.connect()
            const database = client.db(configuration.databaseName)
            Object.assign(this, {
                collection: name => database.collection(name),
                disconnect: () => {
                    client && client.close()
                    logger.info('[MONGO] Disconnected from mongo database')
                }
            })
        } catch (err) {
            throw new Error('Failed to connect to mongodb', err)
        }
        logger.info('[MONGO] Connected to mongo database')
    },
    disconnect: () => {},
})
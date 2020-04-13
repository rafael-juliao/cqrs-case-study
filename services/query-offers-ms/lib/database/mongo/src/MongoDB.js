const { MongoClient, ObjectID } = require('mongodb')

const buildMongoUrl = config => {
    const mongoUrl = `mongodb://${config.databaseUrl}:${config.databasePort}`
    return mongoUrl
}

module.exports = ({ logger, config }) => ({

    mongoId: id => new ObjectID(id),

    connect: async function () {
        logger.info('[MONGO] Connecting to mongo database...')

        const client = new MongoClient(buildMongoUrl(config), { useUnifiedTopology: true, useNewUrlParser: true });
        try {
            await client.connect()
            const database = client.db(config.databaseName)
            Object.assign(this, {
                collection: name => database.collection(name),
                close: () => client && client.close,
            })
        } catch (err) {
            throw new Error('Failed to connect to mongodb', err)
        }
        logger.info('[MONGO] Connected to mongo database')
    }
})
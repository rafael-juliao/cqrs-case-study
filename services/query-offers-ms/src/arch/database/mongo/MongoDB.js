const logger = require('./Logger.mjs')
const config = require('./Config.mjs')
const { MongoClient, ObjectID } = require('mongodb')

const buildMongoUrl = () => {
    const mongoUrl = `mongodb://${config.mongoUrl}:${config.mongoPort}`
    logger.secret(`[MONGO] URL: ${mongoUrl}`)
    return mongoUrl
}

export default {

    mongoId: id => new ObjectID(id),

    connect: async function () {
        logger.info('[MONGO] Connecting to mongo database...')

        const client = new MongoClient(buildMongoUrl(), { useUnifiedTopology: true, useNewUrlParser: true });
        try {
            await client.connect()
            const database = client.db(config.mongoDatabase)
            Object.assign(this, {
                collection: name => database.collection(name),
                close: () => client && client.close,
            })
        } catch (err) {
            throw new Error('Failed to connect to mongodb', err)
        }
        logger.info('[MONGO] Connected to mongo database')
    }
}
import config from './Config.mjs'
import mongoDb from 'mongodb'
const { MongoClient } = mongoDb

export default {
    connect: async function () {
        const client = new MongoClient(config.mongoUrl, { useNewUrlParser: true });
        try {
            await client.connect()
            const database = client.db(config.mongoDatabase)
            Object.assign(this, {
                collection: name => database.collection(name),
                close: () => client && client.close
            })
        } catch (err) {
            throw new Error('Failed to connect to mongoDb', err)
        }
    }
}
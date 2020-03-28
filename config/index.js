import info from './info';

export default {
    mongoDb: () => ({
        connectionUrl: process.env.MONGO_URL || 'localhost:1234',
        databaseName: info.service,
    })
}
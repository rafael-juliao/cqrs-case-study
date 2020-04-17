export default {
    
    httpPort: process.env.HTTP_PORT || 3000,

    mongoUrl: process.env.MONGO_URL || 'localhost',
    mongoPort: process.env.MONGO_PORT || 27017,
    mongoUser: process.env.MONGO_USER || '',
    mongoPass: process.env.MONGO_PASS || '',
    mongoDatabase: process.env.MONGO_DATABASE || 'global',

    rabbitUrl: process.env.RABBIT_URL || 'localhost',
    rabbitPort: process.env.RABBIT_PORT || 5672,
}
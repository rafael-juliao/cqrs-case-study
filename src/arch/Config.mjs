export default {
    
    serverPort: process.env.APP_PORT || 3000,

    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
    mongoUser: process.env.MONGO_USER || '',
    mongoPass: process.env.MONGO_PASS || '',
    mongoDatabase: process.env.MONGO_DATABASE || 'offers-ms',

    rabbitUrl: 'amqp://localhost:5672'
}
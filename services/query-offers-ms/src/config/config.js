module.exports = {
    // Http Application Config
    httpPort: process.env.APP_PORT,

    // Database Config
    database: process.env.DATABASE,
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.DATABASE_URL,
    databasePort: process.env.DATABASE_PORT,

    // Message Broker Config
    messageBroker: process.env.MESSAGE_BROKER,
    messageBrokerUrl: process.env.MESSAGE_BROKER_URL,
    messageBrokerPort: process.env.MESSAGE_BROKER_PORT,

    // Events Config
    events: require('./eventsConfig')(process.env.MESSAGE_BROKER),
}
module.exports = {
    // Http Application Config
    httpPort: process.env.APP_PORT,

    // Database Config
    database: process.env.DATABASE,
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.DATABASE_URL,
    databasePort: process.env.DATABASE_PORT,

    // Message Channel Config
    messageChannel: process.env.MESSAGE_CHANNEL,
    messageChannelUrl: process.env.MESSAGE_CHANNEL_URL,
    messageChannelPort: process.env.MESSAGE_CHANNEL_PORT,

    // Events Config
    getEvent: event => require('./events')(process.env.MESSAGE_CHANNEL)[event],
}
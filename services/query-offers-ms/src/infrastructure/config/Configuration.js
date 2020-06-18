const dotenv = require('dotenv')
const result = dotenv.config({ path: `.env` })
if (result.error) throw new Error(`Failed to load config`)

module.exports = ({
    // Http Application Config
    httpPort: process.env.APP_PORT,

    // Database Config
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.DATABASE_URL,
    databasePort: process.env.DATABASE_PORT,

    // Message Channel Config
    messageChannelUrl: process.env.MESSAGE_CHANNEL_URL,
    messageChannelPort: process.env.MESSAGE_CHANNEL_PORT,

    // Events Config
    events: require('./EventsConfiguration'),
})
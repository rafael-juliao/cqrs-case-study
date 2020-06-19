(async () => {
    const application = require('./src')
    try {
        await application.start()
        process.on('SIGTERM', () => application.stop())
        process.on('SIGINT', () => application.stop())
    }
    catch(err) {
        console.error(err)
        await application.stop()
    }
})()
const { onExit } = require('@rafael-juliao/process-exit')
const application = require('./src')
application.start()
onExit(application.stop)
const { onExit, exit } = require('@rafael-juliao/process-exit')
const application = require('./src')
onExit(application.stop)
application.start()
    .catch(err => {
        console.error(err)
        exit()
    })

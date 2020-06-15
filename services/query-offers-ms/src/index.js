const { createContainer } = require('awilix')
const Application = require('./Application')
const { onExit } = require('@rafael-juliao/process-exit')

const dependencies = createContainer()
dependencies.register(require('./infrastructure/config'))
dependencies.register(require('./infrastructure/database'))
dependencies.register(require('./infrastructure/messages'))
dependencies.register(require('./infrastructure/logger'))
dependencies.register(require('./infrastructure/requests'))
dependencies.register(require('./app/events'))
dependencies.register(require('./app/api'))

const application = dependencies.build(Application)
application.start()

onExit(async () => {
    await application.stop()
})

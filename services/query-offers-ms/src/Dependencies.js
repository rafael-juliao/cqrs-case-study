const { createContainer } = require('awilix')

const dependencies = createContainer()
dependencies.register(require('./infrastructure/config'))
dependencies.register(require('./infrastructure/database'))
dependencies.register(require('./infrastructure/messages'))
dependencies.register(require('./infrastructure/logger'))
dependencies.register(require('./infrastructure/requests'))
dependencies.register(require('./app/events'))
dependencies.register(require('./app/api'))

module.exports = {
    buildApplication: () => dependencies.build(require('./Application'))
}
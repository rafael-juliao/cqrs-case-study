const { createContainer, InjectionMode } = require('awilix')

const dependencies = createContainer()

dependencies.register(require('./infrastructure/database'))
dependencies.register(require('./infrastructure/messages'))
dependencies.register(require('./infrastructure/config'))

dependencies.loadModules(
    [
        'src/domain/**/*.js',
        'src/infrastructure/**/*.js',
    ],
    {
        formatName: 'camelCase',
        resolverOptions: {
            injectionMode: InjectionMode.PROXY
        }
    }
)

module.exports = dependencies.build(require('./Application'))


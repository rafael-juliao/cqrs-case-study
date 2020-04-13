module.exports = {
    load: function () {
        const env = process.env.ENV || 'local'
        const dotenv = require('dotenv')
        const result = dotenv.config({ path: `./src/config/envs/${env}.env` })
        if (result.error)
            throw new Error(`Failed to load ${env} config`)
        Object.assign(this, require('./config'))
    }
}


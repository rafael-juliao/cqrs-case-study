module.exports = {
    env: process.env.ENV || 'local',
    ...(
        process.env.ENV === 'prod' ? require('./prod') :
        process.env.ENV === 'test' ? require('./test') :
        require('./local')
    )
}
module.exports =
    config.env === 'production' ?
    require('./redis/RedisDB')
        : require('./mongo/MongoDB')
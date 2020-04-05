module.exports =
    config.env === 'production' ?
    require('./redis/RedisQueryAdapter')
        : require('./mongo/MongoQueryAdapter')
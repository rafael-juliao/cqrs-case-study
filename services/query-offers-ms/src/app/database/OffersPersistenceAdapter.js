module.exports =
    config.env === 'production' ?
    require('./redis/RedisOffersPersistenceAdapter')
        : require('./mongo/MongoOffersPersistenceAdapter')
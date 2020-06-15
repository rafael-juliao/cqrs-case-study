const HttpValidator = require('./HttpValidator')
const HttpHandler = require('./HttpHandler')
module.exports = ({
    logger,
    queryRouter
}) => router => {
    for( const { path, schema, controller } of queryRouter ) {
        logger.info(`[HTTP] ROUTE => GET ${path}`)
        router.get(path, HttpValidator.create(schema), HttpHandler.create(controller))
    }
}
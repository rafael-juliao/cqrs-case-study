const config = require('./config')
const logger = require('../support/logger')
const axios = require('axios')

module.exports.create = async product => {
    const response = await axios.post(`${config.productsUrl}/api/products`, product)
    const productCreated = response.data
    logger.info(`PRODUCT CREATED <== ${JSON.stringify(productCreated)}`)
    return productCreated
}
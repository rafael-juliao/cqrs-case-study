const config = require('./config')
const logger = require('../support/logger')
const axios = require('axios')

module.exports.create = async offer => {
    const response = await axios.post(`${config.offersUrl}/api/offers`, offer)
    const offerCreated = response.data
    logger.info(`OFFER CREATED <== ${JSON.stringify(offerCreated)}`)
    return offerCreated
}
const config = require('./config')
const axios = require('axios')

module.exports = {
    getById: async offerId => (await axios.get(`${config.queryOffersUrl}/api/offers/${offerId}`)).data,
}
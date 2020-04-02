const config = require('./config')
const axios = require('axios');
module.exports.create = async offer => (await axios.post(`${config.offersUrl}/api/offers`, offer)).data
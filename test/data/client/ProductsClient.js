const config = require('./config')
const axios = require('axios')

module.exports.create = async product => (await axios.post(`${config.productsUrl}/api/products`, product)).data
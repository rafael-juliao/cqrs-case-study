const dataFaker = require('./dataFaker')
module.exports = (data) => ({
    name: dataFaker.name(),
    price: dataFaker.price(),
    ...data
})
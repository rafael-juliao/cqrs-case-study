const dataFaker = require('./dataFaker')
const createProduct = require('./createProduct')
module.exports = async (data) => await createProduct({
    name: dataFaker.name(),
    price: dataFaker.price(),
    ...data
})
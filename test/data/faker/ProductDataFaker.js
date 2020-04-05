const dataFaker = require('./dataFaker')

module.exports = ({
    name
} = {}) => ({
    name: name || dataFaker.name(),
    price: dataFaker.price(),
})
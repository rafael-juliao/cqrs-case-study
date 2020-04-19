const dataFaker = require('./dataFaker')

module.exports = ({
    name
} = {}) => ({
    name: name || dataFaker.name(),
    brand: dataFaker.company(),
})
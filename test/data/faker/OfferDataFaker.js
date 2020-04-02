const dataFaker = require('./dataFaker')

module.exports = ({
    products,
    name
} = {}) => ({
    name: name || dataFaker.name(),
    price: dataFaker.price(),
    products: products.map(_id => ({
        _id,
        quantity: dataFaker.quantity(),
    }))
})
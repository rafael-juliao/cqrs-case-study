const dataFaker = require('./dataFaker')

module.exports = ({
    products,
    name
} = {}) => ({
    name: name || dataFaker.name(),
    price: dataFaker.price(),
    items: products.map(_id => ({
        product: { _id },
        quantity: dataFaker.quantity(),
    }))
})
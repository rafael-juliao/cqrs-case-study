const dataFaker = require('./dataFaker')

module.exports = ({
    products,
    name,
    promotion
} = {}) => ({
    name: name || dataFaker.name(),
    price: dataFaker.price(),
    promotion: promotion || dataFaker.bool(),
    items: products.map(_id => ({
        product: { _id },
        quantity: dataFaker.quantity(),
    }))
})
const Chance = require('chance')
const dataFaker = new Chance()
Object.assign(dataFaker, {
    price: () => dataFaker.integer({ min: 1 * 100, max: 100 * 100 }),
    quantity: () => dataFaker.integer({ min: 1, max: 5}),
})
module.exports = dataFaker
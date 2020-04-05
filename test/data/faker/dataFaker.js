const Chance = require('chance')
const dataFaker = new Chance()
Object.assign(dataFaker, {
    price: () => dataFaker.integer({ min: 1 * 100, max: 100 * 100 }),
    quantity: maxCount => dataFaker.integer({ min: 1, max: maxCount || 5}),
})
module.exports = dataFaker
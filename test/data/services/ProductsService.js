const productDataFaker = require('../faker/ProductDataFaker')
const productsClient = require('../client/ProductsClient')

module.exports = {

    createProduct: async function ({ data }) {
        const fakeProduct = productDataFaker(data)
        const product = await productsClient.create(fakeProduct)
        return product
    },

    insertProducts: async function ({ count = 1, ...productsConfig } = {}) {
        const products = []
        while (count--) 
            products.push(await this.createProduct(productsConfig))
        return products
    },

}
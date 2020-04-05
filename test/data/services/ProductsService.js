const productDataFaker = require('../faker/ProductDataFaker')
const dataFaker = require('../faker/dataFaker')
const productsClient = require('../client/ProductsClient')
const logger = require('../support/logger')

module.exports = {

    totalProductsCreated: 0,
    totalProductsReused: 0,
    percentageReuseCreation: function () { return Math.round((this.totalProductsReused/this.totalProductsCreated)*100)},
    logStatistics: function (){
        logger.info(`Total Products Created :${this.totalProductsCreated} | Total Products Reused: ${this.totalProductsReused} | Percentage of usage ${(this.percentageReuseCreation())}` )
    },

    cacheProducts: [],

    getProductFromCache: function () {
        logger.info('[CACHE-HIT]')
        this.totalProductsReused++
        return this.cacheProducts[Math.trunc(Math.random() * this.cacheProducts.length)]
    },

    shouldGetProductFromCache: function ({ reuse = true, reuseRatio = 0.3 } = {}) {
        return (reuse && this.cacheProducts.length && Math.random() < reuseRatio)
    },

    createProduct: async function ({ data }) {
        const fakeProduct = productDataFaker(data)
        const { _id } = await productsClient.create(fakeProduct)
        this.cacheProducts.push(_id)
        this.totalProductsCreated++
        return _id
    },

    insertProducts: async function ({ maxCount = 5, ...productsConfig } = {}) {
        let count = dataFaker.quantity(maxCount)
        const products = []
        while (count--) {
            if (this.shouldGetProductFromCache(productsConfig))
                products.push(this.getProductFromCache())
            else
                products.push(await this.createProduct(productsConfig))
        }
        
        return products
    },

}
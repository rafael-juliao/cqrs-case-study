const productsService = require('./ProductsService')
const offerDataFaker = require('../faker/OfferDataFaker')
const offersClient = require('../client/OffersClient')

module.exports = {

    insertOffers: async function ({ offersConfig: { count = 1, products, data = {} }, productsConfig }) {
        const offers = []
        while (count--) {
            const createdProducts = products || await productsService.insertProducts(productsConfig)
            const generatedOffer = offerDataFaker({ products: createdProducts, ...data })
            const createdOffer = await offersClient.create(generatedOffer)
            offers.push(createdOffer)            
        }
        return offers
    },

    logStatistics: function () {
        productsService.logStatistics()
    }



}
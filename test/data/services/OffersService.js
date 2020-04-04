const productsService = require('./ProductsService')
const offerDataFaker = require('../faker/OfferDataFaker')
const offersClient = require('../client/OffersClient')

module.exports = {

    insertOffers: async function ({ offersConfig: { count = 1, data = {} }, productsConfig }) {
        const offers = []
        while (count--) {
            const offerProducts = await productsService.insertProducts(productsConfig)
            const generatedOffer = offerDataFaker({ products: offerProducts, ...data })
            const createdOffer = await offersClient.create(generatedOffer)
            offers.push(createdOffer)            
        }
        productsService.logStatistics()
        return offers;
    }



}
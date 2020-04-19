const productsService = require('./ProductsService')
const offerDataFaker = require('../faker/OfferDataFaker')
const offersClient = require('../client/OffersClient')

module.exports = {

    insertOffers: async function ({ offersConfig: { count = 1, products, data = {} }, productsConfig }) {
        const offers = []
        while (count--) {
            if (!products) {
                const createdProducts = await productsService.insertProducts(productsConfig)
                products = createdProducts.map(({ _id }) => _id)
            }
            const generatedOffer = offerDataFaker({ products, ...data })
            const createdOffer = await offersClient.create(generatedOffer)
            offers.push(createdOffer)            
        }
        return offers
    },

}
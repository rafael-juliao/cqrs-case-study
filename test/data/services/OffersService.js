const productsService = require('./ProductsService')
const offerDataFaker = require('../faker/OfferDataFaker')
const offersClient = require('../client/OffersClient')

module.exports = {

    insertOffers: async function ({ offersConfig: { count = 1, products, data = {} }, productsConfig }) {
        const offers = []
        while (count--) {
            let offersProducts = products || (await productsService.insertProducts(productsConfig)).map(({ _id }) => _id)
            const generatedOffer = offerDataFaker({ products: offersProducts, ...data })
            const createdOffer = await offersClient.create(generatedOffer)
            offers.push(createdOffer)            
        }
        return offers
    },

}
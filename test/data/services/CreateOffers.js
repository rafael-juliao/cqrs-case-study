const productDataFaker = require('../faker/ProductDataFaker')
const offerDataFaker = require('../faker/OfferDataFaker')
const productsClient = require('../client/ProductsClient')
const offersClient = require('../client/OffersClient')

const insertProducts = async ({ count = 1, ...productsData }) => {
    const products = []
    while (count--) {
        const generatedProduct = productDataFaker(productsData)
        const { _id } = await productsClient.create(generatedProduct)
        products.push(_id)
    }
    return products
}

const createOffers = async ({ offers: { count = 1, ...offersData }, products = {}}) => {
    const offers = []
    while(count--) {
        const createdProducts = await insertProducts(products)
        const generatedOffer = offerDataFaker({ products: createdProducts, ...offersData })
        const createdOffer = await offersClient.create(generatedOffer)
        offers.push(createdOffer)            
    }
    return offers;
}

module.exports = createOffers
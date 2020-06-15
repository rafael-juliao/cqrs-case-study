module.exports = ({ mongoModel }) => {
    const offersModel = mongoModel.create('offers')
    const productsModel = mongoModel.create('products')

    return {
        createOffer: async offer => offersModel.create(offer),
        updateOffer: async (offerId, offer) => offersModel.update(offerId, offer),
        createProduct: async product => productsModel.create(product),
        updateProduct: async (productId, product) => productsModel.update(productId, product),
    }
}
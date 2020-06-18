module.exports = ({ mongoModelFactory }) => {
    const offersModel = mongoModelFactory.create('offers')
    const productsModel = mongoModelFactory.create('products')

    return {
        createOffer: async offer => offersModel.create(offer),
        updateOffer: async (offerId, offer) => offersModel.update(offerId, offer),
        createProduct: async product => productsModel.create(product),
        updateProduct: async (productId, product) => productsModel.update(productId, product),
    }
}
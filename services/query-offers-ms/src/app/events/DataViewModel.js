module.exports = ({ offersPersistence, productsPersistence }) =>({
    createOffer: async offer => await offersPersistence.create(offer),
    updateOffer: async offer => await offersPersistence.update(offer._id, offer),
    offerStatusChanged: async offer => await offersPersistence.update(offer._id, offer),
    createProduct: async product => await productsPersistence.create(product),
    updateProduct: async product => await productsPersistence.update(product._id, product),
    productStatusChanged: async product => await productsPersistence.update(product._id, product),
})
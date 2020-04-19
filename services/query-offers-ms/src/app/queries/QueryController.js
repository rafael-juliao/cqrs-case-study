module.exports = ({ queryAdapter }) => ({
    searchOffers: async ({ query }) => await queryAdapter.searchOffers(query),
    getOfferById: async ({ params: { offerId }}) => await queryAdapter.getOfferById(offerId),
})
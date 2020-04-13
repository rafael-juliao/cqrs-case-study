module.exports = ({ queryAdapter }) => ({
    //searchOffers: ({ query }) => await queryAdapter.searchOffers(query),
    getOfferById: async ({ params: { offerId }}) => await queryAdapter.getOfferById(offerId),
})
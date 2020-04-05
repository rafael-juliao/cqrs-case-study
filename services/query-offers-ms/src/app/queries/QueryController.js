module.exports = ({ queryAdapter }) => ({
    searchOffers: ({ query }) => await queryAdapter.searchOffers(query),
    getOfferById: ({ params: { offerId }}) => await queryAdapter.getById(offerId)
})
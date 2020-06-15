module.exports = ({ queryInterface }) => ({

    getOfferById: async ({ params: { offerId }}) =>
        await queryInterface.getOfferById(offerId),

    searchOffers: async ({ query: { search, status }}) => 
        await queryInterface.searchOffers({ search, status }),

})
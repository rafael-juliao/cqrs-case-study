module.exports = ({ dataQuery }) => ({

    getOfferById: async ({ offerId }) =>
        await dataQuery.getOfferById({ offerId }),

    searchOffers: async ({ search, status }) => 
        await dataQuery.searchOffers({ search, status }),

})
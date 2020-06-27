module.exports = ({ dataQuery }) => ({

    getOfferById: async ({ offerId }) =>
        await dataQuery.getOfferById({ offerId }),

    searchOffers: async ({ search, promotion }) => 
        await dataQuery.searchOffers({ search, promotion }),

})
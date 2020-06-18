module.exports = ({ dataQueryInterface }) => ({

    getOfferById: async ({ offerId }) =>
        await dataQueryInterface.getOfferById({ offerId }),

    searchOffers: async ({ search, status }) => 
        await dataQueryInterface.searchOffers({ search, status }),

})
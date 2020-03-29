export default ({ getOfferByIdService }) => ({
    execute: async offerId => await getOfferByIdService(offerId)
})
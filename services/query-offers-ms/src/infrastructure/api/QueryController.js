module.exports = ({ queryOperations }) => ({

    getOfferById: async (req, res, next) => {
        try {
            const { params : { offerId } } = req
            const result = await queryOperations.getOfferById({ offerId })
            res.status(200).json(result).end()
        } catch (err) {
            next(err)
        }
    },

    searchOffers: async (req, res, next) => {
        try {
            const { query: { search, promotion }} = req
            const result = await queryOperations.searchOffers({ search, promotion: JSON.parse(promotion) })
            res.status(200).json(result).end()
        } catch (err) {
            next(err)
        }
    }

})
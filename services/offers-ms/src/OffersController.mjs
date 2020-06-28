import offersOperations from './OffersOperations.mjs'

export default {

    createOffer: async (req, res, next) => {
        try {
            const offer = req.body
            const createdOffer = await offersOperations.create(offer)
            res.status(201).json(createdOffer).end()
        } catch (err) {
            next(err)
        }
    },

    updateOffer: async (req, res, next) => {
        try {
            const { offerId } = req.params
            const offer = req.body
            const updatedOffer = await offersOperations.updateOffer(offerId, offer)
            res.status(200).json(updatedOffer).end()
        } catch (err) {
            next(err)
        }
    },

    getOfferById: async (req, res, next) => {
        try {
            const { offerId } = req.params
            const offer = await offersOperations.getOfferById(offerId)
            res.status(200).json(offer).end()
        } catch (err) {
            next(err)
        }
    },

    searchOffers: async (req, res, next) => {
        try {
            let { search, promotion } = req.query
            promotion = promotion & JSON.parse(promotion)
            const result = await offersOperations.searchOffers({ search, promotion })
            res.status(200).json(result).end()
        } catch (err) {
            next(err)
        }
    }
    
}
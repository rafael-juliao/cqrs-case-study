import offersService from './OffersService.mjs'

export default {

    createOffer: async (req, res, next) => {
        try {
            const offer = req.body
            const createdOffer = await offersService.create(offer)
            res.status(201).json(createdOffer).end()
        } catch (err) {
            next(err)
        }
    },

    changeStatus: async (req, res, next) => {
        try {
            const { offerId } = req.params
            const { status } = req.body
            const offer = await offersService.changeStatus(offerId, status)
            res.status(200).json(offer).end()
        } catch (err) {
            next(err)
        }
    }
    
}
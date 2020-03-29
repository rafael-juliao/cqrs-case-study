import offersPersistence from './OffersPersistence.mjs'
import offersPublisher from './OffersPublisher.mjs'

export default {

    create: async offer => {
        const createdOffer = await offersPersistence.create(offer)
        await offersPublisher.publish('offer-created', createdOffer)
        return createdOffer
    },

    changeStatus: async (offerId, status) => {

        const offer = await offersPersistence.update({ offerId }, {status})
        
        if (!offer)
            throw new Error(`404|Offer ${offerId} not found`)

        await offersPublisher.publish(`offer-status`, offer)
        return offer
    }

}
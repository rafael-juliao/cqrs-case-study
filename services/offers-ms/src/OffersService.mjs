import eventPublisher from '../arch/RabbitMQ.mjs'
import offersPersistence from './OffersPersistence.mjs'
import OfferEvents from './OfferEvents.mjs'

export default {

    create: async offer => {
        const createdOffer = await offersPersistence.create(offer)
        await eventPublisher.publish(OfferEvents.OFFER_CREATED, createdOffer)
        return createdOffer
    },

    changeStatus: async (offerId, status) => {

        const offer = await offersPersistence.update({offerId}, {status})
        
        if (!offer)
            throw new Error(`404|Offer ${offerId} not found`)

        await eventPublisher.publish(`offer-status`, offer)
        return offer
    }

}
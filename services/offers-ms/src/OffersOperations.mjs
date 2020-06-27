import arch from '@rafael-juliao/lib-microservice'
const { RabbitMQ: eventPublisher } = arch

import offersPersistence from './OffersPersistence.mjs'
import OfferEvents from './OfferEvents.mjs'
import productsProxy from './ProductsProxy.mjs'

export default {

    create: async offer => {
        const createdOffer = await offersPersistence.create(offer)
        await eventPublisher.publish(OfferEvents.OFFER_CREATED, createdOffer)
        return createdOffer
    },

    updateOffer: async (offerId, offer) => {
        const updatedOffer = await offersPersistence.update(offerId, offer)
        if (!updatedOffer) throw new Error(`404|Offer ${offerId} not found`)
        await eventPublisher.publish(OfferEvents.OFFER_UPDATED, updatedOffer)
        return updatedOffer
    },

    getOfferById: async offerId => {
        const offer = await offersPersistence.get(offerId)
        if (!offer) throw new Error(`404|Offer ${offerId} not found`)
        for (let item of offer.items )
            item.product = await productsProxy.getProductById(item.product._id)
        return offer
    },

    searchOffers: async ({
        search,
        promotion,
    }) => {
        const offers = []
        const memoryLimit = 100
        const total = await offersPersistence.count()
        const iterations = Math.ceil(total/memoryLimit)

        const fetchAllProducts = async offer => {
            for(let item of offer.items)
                item.product = await productsProxy.getProductById(item.product._id)
        }

        for (let page = 0; page < iterations; page++) {
            let possibleOffers = await offersPersistence.find( promotion? { promotion } : {}, page*memoryLimit, memoryLimit);

            await Promise.all(possibleOffers.map(fetchAllProducts))

            if (search) {
                search = new RegExp(search, 'i')
                possibleOffers = possibleOffers.filter(
                    ({ items }) => items.some(
                        ({ product: { name, brand } }) => name.match(search) || brand.match(search)
                    )
                )
            }
            offers.push(...possibleOffers)
        }
        return offers
    }

}
import { Offer } from 'domain/entities'
import { OfferCreated } from 'domain/events'

export default ({ offersRepository, eventPublisher }) => 
    async offerData => {
        const offer = Offer(offerData)
        await offer.validate()
        const createdOffer = await offersRepository.create(offer)
        await eventPublisher.publish(
            OfferCreated({ offer: createdOffer })
        )
    }
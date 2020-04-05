export default ({ offersPersistenceAdapter }) => ({
    createOffer: offer => await offersPersistenceAdapter.create(offer),
    updateOffer: offer => await offersPersistenceAdapter.update(offer._id, offer),
    /*offerStatusChanged: offer => {
        if (offer.status == 'active')
            await offersPersistenceAdapter.create(offer.offer_id, offer)
        else
            await offersPersistenceAdapter.delete(offer.offer_id)
    },*/
})
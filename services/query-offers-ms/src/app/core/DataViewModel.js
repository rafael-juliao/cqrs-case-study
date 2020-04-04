export default ({ offersPersistenceAdapter }) => ({
    
    createOffer: (message) => {
        try {
            const offer = message.body
            await offersPersistenceAdapter.create(entity, offer)
        } catch (err) {
            message.sendToDeadLetter(err)
        }
    },

    updateOffer: message => {
        try {
            const offer = message.body
            await offersPersistenceAdapter.update(offer.offer_id, offer)
        } catch (err) {
            message.sendToDeadLetter(err)
        }
    }

})
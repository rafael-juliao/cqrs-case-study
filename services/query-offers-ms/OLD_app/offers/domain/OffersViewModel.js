export default ({ offersPersistenceAdapter }) => ({
    
    create: message => {
        try {
            const offer = message.body
            await offersPersistenceAdapter.create(offer)
        } catch (err) {
            message.sendToDeadLetter(err)
        }
    },

    update: message => {
        try {
            const offer = message.body
            await offersPersistenceAdapter.update(offer.offer_id, offer)
        } catch (err) {
            message.sendToDeadLetter(err)
        }
    }

})
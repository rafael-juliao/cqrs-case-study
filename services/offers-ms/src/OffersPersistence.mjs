import mongoDB from '../arch/MongoDB.mjs'
const { objectId } = mongoDB

export default {
    create: async offer => {
        try {
            const result = await mongoDB.collection('offers').insertOne(offer)
            const [createdOffer] = result.ops
            return createdOffer
        } catch(err) {
            throw new Error('500|Failed to insert offer in database')            
        }
    },
    update: async (offerId, offer) => {
        try {
            const result = await mongoDB.collection('offers').findOneAndUpdate({ _id: objectId(offerId) }, {'$set': offer})
            const updatedOffer = result.value
            return updatedOffer
        } catch(err) {
            throw new Error(`500|Failed to update offer ${offerId} in database`)
        }
    }
}
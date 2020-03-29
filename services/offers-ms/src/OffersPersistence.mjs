import mongoDB from '../arch/MongoDB.mjs'

export default {
    create: async offer => {
        try {
            const result = await mongoDB.collection('offers').insertOne(offer)
            const [createdOffer] = result.ops
            return createdOffer
        } catch(err) {
            throw new Error('500|Failed to insert offer in database')            
        }
    }
}
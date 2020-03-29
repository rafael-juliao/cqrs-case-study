import MongoDB from '../arch/MongoDB.mjs'

export default {
    create: async offer => {
        try {
            const createdOffer = await MongoDB.collection('offers').insertOne(offer)
            return createdOffer
        } catch(err) {
            throw new Error('500|Failed to insert offer in database')            
        }
    }
}
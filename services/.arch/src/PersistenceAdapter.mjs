import mongoDB from './MongoDB.mjs'
const { mongoId } = mongoDB

export default collection => ({
    create: async object => {
        try {
            const result = await mongoDB.collection(collection).insertOne(object)
            const [createdObject] = result.ops
            return createdObject
        } catch(err) {
            throw new Error(`500|Failed to insert in ${collection}`)
        }
    },
    update: async (objectId, product) => {
        try {
            const result = await mongoDB.collection(collection).findOneAndUpdate({ _id: mongoId(objectId) }, {'$set': product})
            const updatedObject = result.value
            return updatedObject
        } catch(err) {
            throw new Error(`500|Failed to update ${objectId} in ${collection}`)
        }
    },
    get: async (objectId) => {
        try {
            const result = await mongoDB.collection(collection).findOne({ _id: mongoId(objectId) })
            const updatedObject = result.value
            return updatedObject
        } catch(err) {
            throw new Error(`500|Failed to get ${objectId} in ${collection}`)
        }
    }
})